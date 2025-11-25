const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const path = require('path');
const postController = require('../controllers/postController');

// storage to backend/uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), postController.createPost);

// List posts (paginated simple)
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT p.id, p.user_id, p.image_path, p.caption, p.created_at,
        u.email AS author_email, u.name AS author_name,
        (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id)::int AS like_count,
        (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id)::int AS comment_count
      FROM posts p
      JOIN users u ON u.id = p.user_id
      ORDER BY p.created_at DESC
      LIMIT 50
    `);

    const currentUserId = req.user?.id || null;
    if (!currentUserId) {
      const posts = rows.map(r => ({ ...r, image_url: `${req.protocol}://${req.get('host')}${r.image_path}`, liked: false }));
      return res.json({ posts });
    }

    const postIds = rows.map(r => r.id);
    const { rows: likedRows } = await pool.query(
      'SELECT post_id FROM likes WHERE user_id = $1 AND post_id = ANY($2::int[])',
      [currentUserId, postIds]
    );
    const likedSet = new Set(likedRows.map(r => r.post_id));
    const posts = rows.map(r => ({ ...r, image_url: `${req.protocol}://${req.get('host')}${r.image_path}`, liked: likedSet.has(r.id) }));
    return res.json({ posts });
  } catch (err) {
    console.error('GET /posts error', err);
    return res.status(500).json({ error: 'server error' });
  }
});

// Create post (image upload + caption) - requires authentication
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    if (!req.file) return res.status(400).json({ error: 'image required' });

    const image_path = `/uploads/${req.file.filename}`;
    const caption = req.body.caption || null;
    const { rows } = await pool.query(
      'INSERT INTO posts (user_id, image_path, caption) VALUES ($1, $2, $3) RETURNING id, user_id, image_path, caption, created_at',
      [req.user.id, image_path, caption]
    );
    return res.status(201).json({ post: rows[0] });
  } catch (err) {
    console.error('POST /posts error', err);
    return res.status(500).json({ error: 'server error' });
  }
});

// Add comment
router.post('/:id/comment', async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const postId = Number(req.params.id);
    const text = (req.body.text || '').trim();
    if (!text) return res.status(400).json({ error: 'text required' });

    const { rows } = await pool.query(
      'INSERT INTO comments (post_id, user_id, text) VALUES ($1, $2, $3) RETURNING id, post_id, user_id, text, created_at',
      [postId, req.user.id, text]
    );
    return res.status(201).json({ comment: rows[0] });
  } catch (err) {
    console.error('POST /posts/:id/comment error', err);
    return res.status(500).json({ error: 'server error' });
  }
});

// List comments
router.get('/:id/comments', async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const { rows } = await pool.query(`
      SELECT c.id, c.text, c.created_at, c.user_id, u.email AS author_email, u.name AS author_name
      FROM comments c
      JOIN users u ON u.id = c.user_id
      WHERE c.post_id = $1
      ORDER BY c.created_at ASC
    `, [postId]);
    return res.json({ comments: rows });
  } catch (err) {
    console.error('GET /posts/:id/comments error', err);
    return res.status(500).json({ error: 'server error' });
  }
});

// Unlike
router.delete('/:id/like', async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const postId = Number(req.params.id);
    await pool.query('DELETE FROM likes WHERE post_id = $1 AND user_id = $2', [postId, req.user.id]);
    const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM likes WHERE post_id = $1', [postId]);
    return res.json({ like_count: rows[0].count });
  } catch (err) {
    console.error('DELETE /posts/:id/like error', err);
    return res.status(500).json({ error: 'server error' });
  } 
});

module.exports = router;
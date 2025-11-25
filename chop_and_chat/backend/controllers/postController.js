const pool = require('../db');
const path = require('path');

exports.createPost = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'image required' });

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'no user' });

    const caption = req.body.caption || null;
    const imgPath = `/uploads/${req.file.filename}`;

    const insert = await pool.query(
      `INSERT INTO posts (user_id, image_path, caption) 
       VALUES ($1, $2, $3) RETURNING id, user_id, image_path, caption, created_at`,
      [userId, imgPath, caption]
    );

    res.status(201).json({ post: insert.rows[0] });

  } catch (e) {
    console.error('createPost error', e);
    res.status(500).json({ error: 'server error' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, u.name 
         FROM posts p 
         JOIN users u ON u.id = p.user_id 
         ORDER BY p.created_at DESC`
    );
    res.json({ posts: result.rows });
  } catch (e) {
    res.status(500).json({ error: 'server error' });
  }
};

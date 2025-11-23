require('dotenv').config();
const express = require('express');
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/health', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT 1 AS ok');
    res.json({ ok: rows[0].ok === 1 });
  } catch (err) {
    console.error('DB health check failed', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'change_me';

// Helper middleware
function authenticateToken(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ error: 'missing token' });
  const token = auth.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'malformed token' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'invalid token' });
    req.user = user;
    next();
  });
}

const postsRouter = require('./routes/posts');

// mount posts router; note: posts router expects req.user to be set by authenticateToken for protected endpoints.
// we'll use the auth middleware on individual routes inside index.js by wiring req.user before routes that need it.
// To allow posts router to see req.user, mount the router and ensure authenticateToken is used where required.
// Simple approach: set up middleware to map token->req.user for all requests (reuse authenticateToken but not fail if missing)
app.use(async (req, res, next) => {
  // try to decode token if present, but don't fail if missing
  const auth = req.headers['authorization'];
  if (auth) {
    const token = auth.split(' ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
      } catch (e) {
        // ignore invalid token
      }
    }
  }
  next();
});

app.use('/posts', postsRouter);

// Register
app.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const lower = email.toLowerCase();
    const { rows } = await pool.query('SELECT id FROM users WHERE email = $1', [lower]);
    if (rows.length) return res.status(409).json({ error: 'user exists' });

    const hashed = await bcrypt.hash(password, 10);
    const insert = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at',
      [lower, hashed, name || null]
    );

    const user = insert.rows[0];
    return res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const lower = email.toLowerCase();
    const { rows } = await pool.query('SELECT id, email, password, name FROM users WHERE email = $1', [lower]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

// Protected: list users (for debug/admin)
app.get('/users', authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, email, name, created_at FROM users ORDER BY id DESC LIMIT 100');
    res.json({ users: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
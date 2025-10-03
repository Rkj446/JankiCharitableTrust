import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AdminModel } from '../models/Admin';

const router = Router();

// Simple in-memory admin for demo. Replace with DB/hashed password in production.
const ADMIN_USER = (process.env.ADMIN_USER || 'admin').toLowerCase();
const ADMIN_PASS = process.env.ADMIN_PASS || 'changeme';

router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  const user = await AdminModel.findOne({ username: username.toLowerCase() });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const secret = process.env.JWT_SECRET || 'insecure_dev_secret_change_me';
  const token = jwt.sign({ username: user.username, role: user.role }, secret, { expiresIn: '12h' });
  return res.json({ token });
});

// One-time seed route guarded by SETUP_TOKEN
router.post('/seed-admin', async (req, res) => {
  const setupToken = process.env.SETUP_TOKEN;
  if (!setupToken || req.headers['x-setup-token'] !== setupToken) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  const exists = await AdminModel.findOne({ username: username.toLowerCase() });
  if (exists) {
    return res.status(409).json({ error: 'Admin already exists' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await AdminModel.create({ username: username.toLowerCase(), passwordHash });
  return res.status(201).json({ created: true });
});

export const authRouter = router;




import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import { body, validationResult } from 'express-validator';

const router = Router();

// In-memory store for donations (replace with database in production)
const donations: any[] = [];

// POST /api/donate - Process donation
router.post(
  '/',
  [
    body('name').trim().isLength({ min: 2 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('amount').isFloat({ min: 1 }).toFloat(),
    body('message').optional().trim().escape(),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const donation = {
      id: donations.length + 1,
      timestamp: new Date(),
      status: 'pending', // In production, this would be handled by payment gateway
      ...req.body,
    };

    donations.push(donation);

    res.status(201).json({
      message: 'Donation received successfully',
      data: donation,
    });
  }
);

// GET /api/donate/list - List all donations (protected route in production)
router.get('/list', requireAuth, (_req, res) => {
  res.json(donations);
});

// GET /api/donate/stats - Get donation statistics
router.get('/stats', requireAuth, (_req, res) => {
  const stats = {
    total: donations.reduce((acc, curr) => acc + curr.amount, 0),
    count: donations.length,
    recent: donations.slice(-5),
  };

  res.json(stats);
});

export const donateRouter = router;
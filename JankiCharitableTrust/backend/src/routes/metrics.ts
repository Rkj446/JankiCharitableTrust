import { Router } from 'express';

const router = Router();

// Mock data for metrics
const mockMetrics = {
  totalDonations: 250000,
  donorsCount: 150,
  projectsCompleted: 25,
  beneficiariesHelped: 1000,
  recentActivity: [
    { type: 'donation', amount: 5000, date: '2024-03-15' },
    { type: 'project', name: 'School Supplies Distribution', date: '2024-03-10' },
    { type: 'event', name: 'Health Camp', date: '2024-03-05' },
    { type: 'donation', amount: 10000, date: '2024-03-01' },
  ],
  monthlyStats: {
    donations: [15000, 20000, 25000, 18000, 22000, 30000, 28000, 35000, 25000, 20000, 18000, 14000],
    projects: [2, 1, 3, 2, 1, 2, 3, 2, 2, 3, 2, 2],
    beneficiaries: [80, 120, 90, 100, 85, 95, 110, 88, 92, 105, 98, 87],
  },
};

// GET /api/metrics - Get dashboard metrics
router.get('/', (_req, res) => {
  res.json(mockMetrics);
});

export const metricsRouter = router;
import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { VolunteerModel } from '../models/Volunteer';

const router = Router();

router.use(requireAuth);

router.get('/', async (req, res) => {
  const volunteers = await VolunteerModel.find().sort({ createdAt: -1 }).lean();
  res.json({ volunteers });
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};
  if (status && !['new', 'reviewed', 'contacted'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  const updated = await VolunteerModel.findByIdAndUpdate(id, { $set: { status } }, { new: true });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json({ volunteer: updated });
});

export const volunteerAdminRouter = router;





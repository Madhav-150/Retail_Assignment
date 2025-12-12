import { Router } from 'express';

const router = Router();

// Admin routes will be implemented here
router.get('/stats', (req, res) => {
  res.json({ message: 'Admin stats endpoint' });
});

export default router;

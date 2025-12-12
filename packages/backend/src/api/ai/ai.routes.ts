import { Router } from 'express';

const router = Router();

// AI routes will be implemented here
router.post('/generate', (req, res) => {
  res.json({ message: 'AI generation endpoint' });
});

export default router;

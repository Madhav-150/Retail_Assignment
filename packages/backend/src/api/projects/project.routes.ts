import { Router } from 'express';

const router = Router();

// Project routes will be implemented here
router.get('/', (req, res) => {
  res.json({ message: 'Projects endpoint' });
});

export default router;

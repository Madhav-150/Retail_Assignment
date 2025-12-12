import { Router } from 'express';
import { getSettings, updateSettings } from './settings.controller';
import { protect } from '../../middleware/auth';

const router = Router();

router.use(protect);

router.get('/', getSettings);
router.put('/', updateSettings);

export default router;

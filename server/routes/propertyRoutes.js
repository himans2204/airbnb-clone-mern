import { Router } from 'express';
import {
  createProperty,
  getProperties,
  getMyProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getProperties);
router.get('/mine', protect, restrictTo('host'), getMyProperties);
router.get('/:id', getPropertyById);

router.post('/', protect, restrictTo('host'), createProperty);
router.put('/:id', protect, restrictTo('host'), updateProperty);
router.delete('/:id', protect, restrictTo('host'), deleteProperty);

export default router;

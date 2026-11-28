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
import { uploadImages } from '../middleware/uploadMiddleware.js';

const router = Router();

router.get('/', getProperties);
router.get('/mine', protect, restrictTo('host'), getMyProperties);
router.get('/:id', getPropertyById);

// protect runs before uploadImages, so only logged-in hosts can send files.
router.post('/', protect, restrictTo('host'), uploadImages, createProperty);
router.put('/:id', protect, restrictTo('host'), uploadImages, updateProperty);
router.delete('/:id', protect, restrictTo('host'), deleteProperty);

export default router;

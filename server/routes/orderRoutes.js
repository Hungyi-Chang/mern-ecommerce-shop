import express from 'express';
import { addOrderItems, getOrderById } from '../controller/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/** *********************************************************
 **desc Create new order
 **route POST /api/orders
 **access Private
 ********************************************************** */

router.route('/').post(protect, addOrderItems);

router.route('/:id').get(protect, getOrderById);

export default router;

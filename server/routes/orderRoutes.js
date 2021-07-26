import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from '../controller/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/** *********************************************************
 **desc Create new order
 **route POST /api/orders
 **access Private
 ********************************************************** */

router.route('/').post(protect, addOrderItems);

router.route('/myorders').get(protect, getMyOrders);

router.route('/:id').get(protect, getOrderById);

router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;

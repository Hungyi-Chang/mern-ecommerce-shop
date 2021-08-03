import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controller/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

/** *********************************************************
 **desc Fetch all products
 **route GET /api/products
 **access Public
 ********************************************************** */

router.route('/').get(getProducts).post(protect, admin, createProduct);

/** *********************************************************
 **desc Fetch single product
 **route GET /api/products/:id
 **access Public
 ********************************************************** */

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;

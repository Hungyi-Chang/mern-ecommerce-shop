import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controller/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

/** *********************************************************
 **desc Register a new user
 **route POST /api/users
 **access Public
 ********************************************************** */

/** *********************************************************
 **desc Get all users
 **route GET /api/users
 **access Private/Admin
 ********************************************************** */

router.route('/').post(registerUser).get(protect, admin, getUsers);

/** *********************************************************
 **desc Auth user & get token
 **route POST /api/users/login
 **access Public
 ********************************************************** */

router.post('/login', authUser);

/** *********************************************************
 **desc Get User Profile
 **route GET /api/users/profile
 **access Private
 ********************************************************** */

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

/** *********************************************************
 **desc Delete user
 **route DELETE /api/users/:id
 **access Private/Admin
 ********************************************************** */

/** *********************************************************
 **desc Get user by ID
 **route GET /api/users/:id
 **access Private/Admin
 ********************************************************** */

/** *********************************************************
 **desc Update User
 **route PUT /api/users/:id
 **access Private/Admin
 ********************************************************** */

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;

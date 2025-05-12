import express from 'express';
import { register, login } from '../controllers/user.controller.js';

const router = express.Router();

// 🔐 User Registration API
router.route('/register').post(register);

// 🔑 User Login API
router.route('/login').post(login);

export default router;


import express from 'express';
import { register, login, logout } from '../controllers/user.controller.js';

const router = express.Router();

// 🔐 User Registration API
router.route('/register').post(register);

// 🔑 User Login API
router.route('/login').post(login);

router.route('/logout').get(logout)
// user.route.js

  

export default router;


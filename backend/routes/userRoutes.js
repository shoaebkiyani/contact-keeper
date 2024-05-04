import express from 'express';
const router = express.Router();
import {
	authUser,
	logoutUser,
	registerUser,
	googleAuthUser,
	getUserProfile,
	updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/google', googleAuthUser)
router.post('/logout', logoutUser);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

export default router;

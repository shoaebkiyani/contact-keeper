import express from 'express';
const router = express.Router();
import {
	getAllContacts,
	getSingleContact,
	addContact,
	updateContact,
	deleteContact,
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getAllContacts);
router.route('/:id').get(protect, getSingleContact);
router.post('/add-contact', protect, addContact);
router.put('/update-contact/:id', protect, updateContact);
router.delete('/delete-contact/:id', protect, deleteContact);

export default router;

import asyncHandler from 'express-async-handler';

import Contact from '../models/contactModel.js';

// @desc    Fetch all contacts
// @route   GET /api/contacts
// @access  Private
const getAllContacts = asyncHandler(async (req, res) => {
	// const user_id = req.user._id;
	const contacts = await Contact.find({ user: req.user._id }).sort({
		createdAt: -1,
	});
	if (contacts) {
		return res.status(200).json(contacts);
	} else {
		res.status(404);
		throw new Error('Resource not found');
	}
});

// @desc    Fetch single contact
// @route   GET /api/contacts/:id
// @access  Private
const getSingleContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);
	if (contact) {
		return res.json(contact);
	} else {
		res.status(404);
		throw new Error('Resource not found');
	}
});

// @desc    Add single contact
// @route   POST /api/add-contact/
// @access  Private
const addContact = asyncHandler(async (req, res) => {
	const { firstname, lastname, email, phone, notes } = req.body;
	const newContact = new Contact({
		firstname,
		lastname,
		email,
		phone,
		notes,
		user: req.user._id,
	});

	const contact = await newContact.save();
	if (contact) {
		res.status(200).json(contact);
	} else {
		res.status(404);
		throw new Error('Error adding contact');
	}
});

// @desc    Update single contact
// @route   PUT /api/update-contact/:id
// @access  Private
const updateContact = asyncHandler(async (req, res) => {
	const { firstname, lastname, email, phone, notes } = req.body;

	const contact = await Contact.findById(req.params.id);

	if (contact) {
		contact.firstname = firstname;
		contact.lastname = lastname;
		contact.email = email;
		contact.phone = phone;
		contact.notes = notes;

		const updatedContact = await contact.save();
		res.status(200).json(updatedContact);
	} else {
		res.status(404);
		throw new Error('Resource not found');
	}
});

// @desc    Delete single contact
// @route   DELETE /api/delete-contact/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);

	if (contact) {
		await Contact.deleteOne({ _id: contact._id });
		res.status(200).json({ message: 'Contact deleted' });
	} else {
		res.status(400);
		throw new Error('Contact not found');
	}
});

export {
	getAllContacts,
	getSingleContact,
	addContact,
	updateContact,
	deleteContact,
};

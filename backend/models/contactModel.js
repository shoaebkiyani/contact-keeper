import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
			required: true,
		},
		notes: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;

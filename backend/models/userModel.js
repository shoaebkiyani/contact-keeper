import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		profileImage: {
			type: String,
			default:
				'https://up.yimg.com/ib/th?id=OIP.XnpM4kcShhqe-aPu7rvF5wHaF3&pid=Api&rs=1&c=1&qlt=95&w=154&h=122',
		},
	},
	{
		timestamps: true,
	}
);

// Middleware for hashing a password
// pre: Before we save the password

// Arrow function is not used because
// of how the 'this' keyword works

// next: because it is a middleware,
// so we use it to move to the next
// piece of middleware

// this: this means user.create/user.save
// if password isn't modified/created then move ahead
// if password is modified or created
// then hash it using bcrypt
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
	// compares if enteredpassword matches this.password
	// which is hased password in the DB
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;

import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public

const authUser = asyncHandler(async (req, res) => {
	// password checking is in userModel
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc    Register a new user
// route    POST /api/users/
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	// Make sure if the user is created
	// The token is not sent here,
	// it will be stored in HttpOnly cookie
	// Bcrypt is in the model
	if (user) {
		// res because of res.cookie
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public

const logoutUser = asyncHandler(async (req, res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0),
	});

	res.status(200).json({ message: 'User logged out' });
});

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
	const user = {
		_id: req.user._id,
		name: req.user.name,
		email: req.user.email,
	};

	res.status(200).json(user);
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}
		const updatedUser = await user.save();
		res.status(200).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

const googleAuthUser = asyncHandler(async (req, res) => {
	// if user already exist,
	// then generate a token
	// and login the user
	// else create a new user,
	// generate a token and login
	const user = await User.findOne({ email: req.body.email });

	if (user) {
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			profileImage: user.profileImage,
		});
	} else {
		const generatedPassword =
			Math.random.toString(36).slice(-8) + Math.random.toString(36).slice(-8);
		const hashedPassword = await bcrypt.hash(generatedPassword, 10);

		const user = await User.create({
			name: req.body.name.split('').join('').toLowerCase(),
			email: req.body.email,
			password: hashedPassword,
			profileImage: req.body.photo,
		});
		await user.save();

		if (user) {
			generateToken(res, user._id);
			res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				profileImage: user.profileImage,
			});
		} else {
			res.status(401);
			throw new Error('Error Logging In');
		}
	}
});

export {
	authUser,
	logoutUser,
	registerUser,
	googleAuthUser,
	getUserProfile,
	updateUserProfile,
};

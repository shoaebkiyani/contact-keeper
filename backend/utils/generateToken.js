import jwt from 'jsonwebtoken';

// jsonwebtoken works as you can add
// something into the payload
// and what we added is userId

// userId is needed when validating
// the token and with that we can
// pull out the user's profile etc
const generateToken = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		// expiresIn: '60000',
		expiresIn: '1d',
	});

	// secure: if the site has to be https
	// sameSite: prevents csrf attacks
	res.cookie('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: 1 * 24 * 60 * 60 * 1000,
		// maxAge: 60000,
	});
};

export default generateToken;

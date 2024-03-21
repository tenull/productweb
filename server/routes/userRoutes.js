import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../middleware/sendVerificationEmail.js';
import { sendPasswordResetEmail } from '../middleware/sendPasswordResetEmail.js';
import { protectRoute, admin } from '../middleware/authMiddleware.js';
import Order from '../models/Order.js';

const userRoutes = express.Router();

//TODO: redefine expiresIn
const genToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '60d' });
};

// login
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user && (await user.matchPasswords(password))) {
		user.firstLogin = false;
		await user.save();
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			googleImage: user.googleImage,
			goodleId: user.googleId,
			isAdmin: user.isAdmin,
			token: genToken(user._id),
			active: user.active,
			firstLogin: user.firstLogin,
			created: user.createdAt,
		});
	} else {
		res.status(401).send('Rossz email cím vagy jelszó.');
		throw new Error('Felhasználó nem található.');
	}
});

// register
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400).send('Már van fiókunk ezzel az e-mail címmel.');
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	const newToken = genToken(user._id);

	sendVerificationEmail(newToken, email, name);

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			googleImage: user.googleImage,
			googleId: user.googleId,
			firstLogin: user.firstLogin,
			isAdmin: user.isAdmin,
			token: newToken,
			active: user.active,
			createdAt: user.createdAt,
		});
	} else {
		res.status(400).send('Nem tudtuk regisztrálni.');
		throw new Error('Valami hiba történt. Kérjük, ellenőrizze adatait, és próbálja újra.');
	}
});

// verify email
const verifyEmail = asyncHandler(async (req, res) => {
	const user = req.user;
	user.active = true;
	await user.save();
	res.json('Köszönjük, hogy aktiválta fiókját. Most bezárhatja ezt az ablakot.');
});

// password reset request
const passwordResetRequest = asyncHandler(async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email: email });
		if (user) {
			const newToken = genToken(user._id);
			sendPasswordResetEmail(newToken, user.email, user.name);
			res.status(200).send(`Visszaállítási e-mailt küldtünk a ${email} címre`);
		}
	} catch (error) {
		res.status(401).send('Nincs ilyen e-mail címmel rendelkező fiók.');
	}
});

// password reset
const passwordReset = asyncHandler(async (req, res) => {
	const token = req.headers.authorization.split(' ')[1];
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		const user = await User.findById(decoded.id);

		if (user) {
			user.password = req.body.password;
			await user.save();
			res.json('A jelszavad sikeresen frissítve.');
		} else {
			res.status(404).send('Felhasználó nem található.');
		}
	} catch (error) {
		res.status(401).send('A jelszó visszaállítása nem sikerült.');
	}
});

//google login
const googleLogin = asyncHandler(async (req, res) => {
	const { googleId, email, name, googleImage } = req.body;
	console.log(googleId, email, name, googleImage);

	try {
		const user = await User.findOne({ googleId: googleId });
		if (user) {
			user.firstLogin = false;
			await user.save();
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				googleImage: user.googleImage,
				googleId: user.googleId,
				firstLogin: user.firstLogin,
				isAdmin: user.isAdmin,
				token: genToken(user._id),
				active: user.active,
				createdAt: user.createdAt,
			});
		} else {
			const newUser = await User.create({
				name,
				email,
				googleImage,
				googleId,
			});

			const newToken = genToken(newUser._id);

			sendVerificationEmail(newToken, newUser.email, newUser.name, newUser._id);
			res.json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				googleImage: newUser.googleImage,
				googleId: newUser.googleId,
				firstLogin: newUser.firstLogin,
				isAdmin: newUser.isAdmin,
				token: genToken(newUser._id),
				active: newUser.active,
				createdAt: newUser.createdAt,
			});
		}
	} catch (error) {
		res.status(404).send('Hiba történt. Később próbálja meg újra.');
	}
});

const getUserOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.params.id });
	if (orders) {
		res.json(orders);
	} else {
		res.status(404);
		throw new Error('Nem található megrendelés.');
	}
});

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
	try {
		const userId = req.params.id;
		console.log("Az azonosítóval rendelkező felhasználó törlése:", userId);
		const user = await User.findByIdAndDelete(userId); // Módosított sor
		console.log("Törölt felhasználó:", user);
		if (!user) {
			return res.status(404).json({ message: 'Felhasználó nem található.' });
		}
		res.json(user);
	} catch (error) {
		console.error("Hiba történt a felhasználó törlésekor:", error);
		res.status(500).json({ message: 'Belső Szerverhiba.' });
	}
});



userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
userRoutes.route('/verify-email').get(protectRoute, verifyEmail);
userRoutes.route('/password-reset-request').post(passwordResetRequest);
userRoutes.route('/password-reset').post(protectRoute, passwordReset);
userRoutes.route('/google-login').post(googleLogin);
userRoutes.route('/:id').get(protectRoute, getUserOrders);
userRoutes.route('/').get(protectRoute, admin, getUsers);
userRoutes.route('/:id').delete(protectRoute, admin, deleteUser);

export default userRoutes;
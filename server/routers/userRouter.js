// minuto 4:06:19, video https://www.youtube.com/watch?v=TRCDsB9i3bI&t=11s

import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

// function is async because of the nature of mongoose
userRouter.get(
	'/seed',
	expressAsyncHandler(async (req, res) => {
		// await User.remove({});
		const createdUsers = await User.insertMany(data.users);
		// console.log('createdUsers', createdUsers);
		res.send({ createdUsers });
	})
);

// post method because we creating new resource
userRouter.post(
	'/signin',
	expressAsyncHandler(async (req, res) => {
		const user = await User.findOne({ email: req.body.email });
		console.log('this is user', user);
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				res.send({
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					token: generateToken(user),
				});
				return;
			}
		}
		res.status(401).send({ message: 'Invalid user or password' });
	})
);

userRouter.post(
	'/register',
	expressAsyncHandler(async (req, res) => {
		// let user = await User.findOne({ email: req.body.email });
		// if (user) {
		// 	res.status(400).send({ message: 'User already exists' });
		// } else {
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
		});
		await user.save();
		res.send({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user),
		});
		// }
	})
);

export default userRouter;

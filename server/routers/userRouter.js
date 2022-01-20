// minuto 4:06:19, video https://www.youtube.com/watch?v=TRCDsB9i3bI&t=11s

import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';

const userRouter = express.Router();

// function is async because of the nature of mongoose
userRouter.get(
	'/seed',
	expressAsyncHandler(async (req, res) => {
		// await User.remove({});
		const createdUsers = await User.insertMany(data.users);
		console.log('createdUsers', createdUsers);
		res.send({ createdUsers });
	})
);

export default userRouter;

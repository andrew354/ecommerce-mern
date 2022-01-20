// minuto 4:00:20, video https://www.youtube.com/watch?v=TRCDsB9i3bI&t=11s
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, defualt: false, required: true },
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', userSchema);

export default User;

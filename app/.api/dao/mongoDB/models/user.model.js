import mongoose from 'mongoose';

const userCollection = 'user';

const userSchema = new mongoose.Schema({
	complete_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	age: {
		type: Number
	}
});

export const userModel = mongoose.model(userCollection, userSchema);

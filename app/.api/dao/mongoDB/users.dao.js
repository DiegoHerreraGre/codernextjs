import { userModel } from './models/user.model.js';

const getAll = async (query, options) => {
	const users = await userModel.paginate(query, options);
	return users;
};

const getById = async (id) => {
	const user = await userModel.findById(id);
	return user;
};

const getByEmail = async (email) => {
	const user = await userModel.findOne({ email: email });
	return user;
};

const create = async (data) => {
  console.log('Attempting to create user with data:', data);
  try {
    const user = await userModel.create(data);
    console.log('User created successfully:', user);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
const update = async (id, data) => {
	const userUpdate = await userModel.findByIdAndUpdate(id, data, { new: true });
	return userUpdate;
};

const deleteOne = async (id) => {
	const user = await userModel.findByIdAndUpdate(
		id,
		{ status: false },
		{ new: true }
	);
	return user;
};

export default {
	getAll,
	getById,
	create,
	update,
	deleteOne,
	getByEmail,
};
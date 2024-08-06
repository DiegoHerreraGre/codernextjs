import { Router } from 'express';
import userDao from '../dao/mongoDB/users.dao.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { complete_name, email, age } = req.query;
    
    // Check if user already exists
    const existingUser = await userDao.getByEmail(email);
    if (existingUser) {
      return res.status(400).json({ status: 'error', msg: 'User with this email already exists' });
    }

    const newUser = await userDao.create({
      complete_name,
      email,
      age: age ? parseInt(age) : undefined
    });

    if (!newUser) {
      throw new Error('Failed to create user');
    }

    res.status(201).json({ status: 'ok', user: newUser });
  } catch (error) {
    console.error('Error in user registration:', error);
    res.status(500).json({ status: 'error', msg: error.message || 'Internal Server Error' });
  }
});

export default router;
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

function buildUserResponse(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  };
}

export async function register(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      res.status(400);
      throw new Error('Name, email and password are required');
    }

    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      res.status(400);
      throw new Error('An account with this email already exists');
    }

    const user = await User.create({ name, email, password, role });
    res.status(201).json(buildUserResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      res.status(400);
      throw new Error('Email and password are required');
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    res.json(buildUserResponse(user));
  } catch (error) {
    next(error);
  }
}

export function getMe(req, res) {
  res.json(req.user);
}

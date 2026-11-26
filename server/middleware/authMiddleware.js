import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      res.status(401);
      throw new Error('Not logged in');
    }

    const token = header.split(' ')[1];
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      res.status(401);
      throw new Error('Invalid or expired token');
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401);
      throw new Error('This user no longer exists');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export function restrictTo(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      return next(new Error('You do not have permission to do this'));
    }
    next();
  };
}

import { v2 as cloudinary } from 'cloudinary';

// The cloudinary package reads CLOUDINARY_URL from the environment (set in server/.env).
if (!process.env.CLOUDINARY_URL) {
  console.warn('CLOUDINARY_URL is not set. Image uploads will not work.');
}

cloudinary.config({ secure: true });

export default cloudinary;

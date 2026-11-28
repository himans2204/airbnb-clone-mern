import cloudinary from '../config/cloudinary.js';

export function uploadImageBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'stayinyourroom' }, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve({ url: result.secure_url, publicId: result.public_id });
    });

    stream.end(buffer);
  });
}

export async function deleteImage(publicId) {
  await cloudinary.uploader.destroy(publicId);
}

import multer from 'multer';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 5;

function onlyImages(req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    return cb(null, true);
  }

  const error = new Error('Only image files are allowed');
  error.status = 400;
  cb(error);
}

// Files stay in memory and are sent straight to Cloudinary, so nothing is saved on the server's disk.
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: onlyImages,
  limits: { fileSize: MAX_FILE_SIZE, files: MAX_FILES },
});

export const uploadImages = upload.array('images', MAX_FILES);

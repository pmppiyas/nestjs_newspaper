import { cloudinary } from '@/common/config/cloudinary.config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  params: async (req, file) => {
    const fileName = file.originalname
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/\./g, '_')
      .replace(/[^a-z0-9_]/gi, '');

    const uniqueFileName =
      Math.random().toString(36).substring(2) +
      '-' +
      Date.now() +
      '-' +
      fileName;

    return {
      folder: 'school',
      public_id: uniqueFileName,
      resource_type: 'auto',
    };
  },
});

export const multerOptions: MulterOptions = {
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
};

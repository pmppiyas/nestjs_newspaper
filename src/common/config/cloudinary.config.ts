import { env } from '@/common/config/env';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: env.CLOUDINARY.CLOUD_NAME,
  api_key: env.CLOUDINARY.API_KEY,
  api_secret: env.CLOUDINARY.API_SECRET,
});

export { cloudinary };

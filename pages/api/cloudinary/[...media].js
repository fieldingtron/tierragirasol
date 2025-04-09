import { mediaHandlerConfig, createMediaHandler } from 'next-tinacms-cloudinary/dist/handlers';
import { isAuthorized } from '@tinacms/auth';

// FIX: Inline the config object instead of exporting the variable
export const config = {
  api: {
    bodyParser: false,
  },
};

export default createMediaHandler({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  authorized: async (req, res) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        return true;
      }

      const user = await isAuthorized(req);
      return user && user.verified;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
});

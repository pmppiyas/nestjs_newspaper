import { JwtPayload } from '@/common/helper/verifyToken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

  import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from 'interface/auth_interface';
import { apiError } from '@utils/response';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';
export interface UserPayload extends JwtPayload {
  role: string | { _id: string };
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload;
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json(apiError('Token not found', {}, 401));
    return;
  }
  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) {
      res.status(401).json(apiError('Unauthorized', {}, 401));
      return;
    }
    req.user = user as UserPayload;
    next();
  });
};

// Middleware to check user roles

// export const checkRole = (allowedRoles: string[]) => {
//   return async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
//   ): Promise<void> => {
//     try {
//       const user = req.user;

//       if (!user || !user.role) {
//         res
//           .status(403)
//           .json(apiError(PLAIN_RESPONSE_MSG.accessDenied, {}, 403));
//         return;
//       }
//       const dbUser = await User.findById(user.id).populate('role');
//       if (
//         !dbUser ||
//         !dbUser.role ||
//         typeof (dbUser.role as any).label !== 'string' ||
//         !allowedRoles.includes((dbUser.role as any).label)
//       ) {
//         res
//           .status(403)
//           .json(apiError(PLAIN_RESPONSE_MSG.accessDenied, {}, 403));
//         return;
//       }

//       next();
//     } catch (error) {
//       res.status(500).json(apiError(PLAIN_RESPONSE_MSG.serverError, {}, 500));
//     }
//   };
// };

// export const permissionCheck = async (
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   const { user } = req;
//   try {
//     if (!user) {
//       res
//         .status(401)
//         .json(apiError(PLAIN_RESPONSE_MSG.unAuthenticated, {}, 401));
//       return;
//     }
//     const dbUser = await RoleModel.findOne({ _id: user.role });
//     const role = getValue(dbUser, 'label');

//     if (!role) {
//       res.status(403).json(apiError(PLAIN_RESPONSE_MSG.accessDenied, {}, 403));
//       return;
//     }
//     next();
//   } catch (error: any) {
//     res.status(500).json(apiError(PLAIN_RESPONSE_MSG.serverError, {}, 500));
//   }
// };

// export const permissionScopeCheck = (requiredScopes: string[]) => {
//   return async (
//     req: CustomRequest,
//     res: Response,
//     next: NextFunction,
//   ): Promise<void> => {
//     const { user } = req;

//     try {
//       if (!user) {
//         res
//           .status(401)
//           .json(apiError(PLAIN_RESPONSE_MSG.unAuthenticated, {}, 401));
//         return;
//       }
//       const roleDoc = await RoleModel.findById(user.role);

//       if (!roleDoc) {
//         res
//           .status(403)
//           .json(apiError(PLAIN_RESPONSE_MSG.accessDenied, {}, 403));
//         return;
//       }

//       if (roleDoc.adminAccess) {
//         return next();
//       }

//       const roleScopes: string[] = roleDoc?.scopes || [];
//       const hasPermission = requiredScopes.some((scope) =>
//         roleScopes.includes(scope),
//       );
//       if (!hasPermission) {
//         res
//           .status(403)
//           .json(apiError(PLAIN_RESPONSE_MSG.accessDenied, {}, 403));
//         return;
//       }
//       next();
//     } catch (err) {
//       res.status(500).json(apiError(PLAIN_RESPONSE_MSG.serverError, {}, 500));
//     }
//   };
// };

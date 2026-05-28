import userRepositories from '../services/users/repositories/user-repositories.js';
import response from '../utils/response.js';
import AuthorizationError from '../exceptions/authorization-error.js';
const permissionGuard = (requiredPermission) => async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userPermissions =
      await userRepositories.getPermissionsByUserId(userId);
    if (!userPermissions.includes(requiredPermission)) {
      return next(
        new AuthorizationError(
          'Anda tidak memiliki izin untuk mengakses resource ini',
        ),
      );
    }
    return next();
  } catch (error) {
    next(error);
  }
};

export default permissionGuard;

import ClientError from '../exceptions/client-error.js';
import userRepositories from '../services/users/repositories/user-repositories.js';
import response from '../utils/response.js';
const permissionGuard = (requiredPermission) => async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userPermissions =
      await userRepositories.getPermissionsByUserId(userId);
    if (!userPermissions.includes(requiredPermission)) {
      return next(
        new ClientError(
          'Anda tidak memiliki izin untuk mengakses resource ini',
          403,
        ),
      );
    }
    return next();
  } catch (error) {
    next(error);
  }
};

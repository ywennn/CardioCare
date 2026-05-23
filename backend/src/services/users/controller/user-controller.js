import userRepositories from '../repositories/user-repositories.js';
import response from '../../../utils/response.js';
import { InvariantError } from '../../../exceptions/index.js';

export const createUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.validated;
    const isEmailAvailable = await userRepositories.verifyAvailableEmail(email);
    if (!isEmailAvailable) {
      return next(
        new InvariantError('Registrasi gagal. Email sudah digunakan'),
      );
    }

    const user = await userRepositories.addUser({
      fullName,
      email,
      password,
    });
    if (!user) {
      return next(
        new InvariantError('Registrasi gagal. Gagal mendaftarkan user'),
      );
    }
    return response(res, 201, 'Registrasi Berhasil', { id: user });
  } catch (err) {
    next(err);
  }
};

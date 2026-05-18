import userRepositories from '../repositories/user-repositories.js';
import response from '../../../utils/response.js';
import { InvariantError } from '../../../exceptions/index.js';

export const createUser = async (req, res, next) => {
  try {
    const { fullName, username, birthDate, email, password } = req.validated;
    const role = 'user';
    const isEmailAvailable = await userRepositories.verifyAvailableEmail(email);
    if (!isEmailAvailable) {
      return next(
        new InvariantError('Registrasi gagal. Email sudah digunakan'),
      );
    }
    const user = await userRepositories.addUser({
      fullName,
      username,
      birthDate,
      email,
      password,
      role,
    });
    if (!user) {
      return next(
        new InvariantError('Registrasi gagal. Gagal mendaftarkan user'),
      );
    }
    return response(res, 201, 'Registrasi Berhasil', user);
  } catch (err) {
    next(err);
  }
};

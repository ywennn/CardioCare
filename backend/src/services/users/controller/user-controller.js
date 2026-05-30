import userRepositories from '../repositories/user-repositories.js';
import response from '../../../utils/response.js';
import { InvariantError } from '../../../exceptions/index.js';

export const createUser = async (req, res, next) => {
  try {
    const { fullName, userName, email, password } = req.validated;
    const isEmailAvailable = await userRepositories.verifyAvailableEmail(email);
    if (!isEmailAvailable) {
      return next(
        new InvariantError('Registrasi gagal. Email sudah digunakan'),
      );
    }

    const user = await userRepositories.addUser({
      fullName,
      userName,
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

export const getMe = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await userRepositories.getMeById(id);
    if (!user) {
      return next(new InvariantError('User tidak ditemukan'));
    }
    return response(res, 200, 'Berhasil mengambil data user', user);
  } catch (err) {
    next(err);
  }
};

export const putUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { fullName, email } = req.validated;
    const updatedUserId = await userRepositories.putUserById(id, {
      fullName,
      email,
    });
    if (!updatedUserId) {
      return next(new InvariantError('Gagal memperbarui data user'));
    }
    return response(res, 200, 'Berhasil memperbarui data user', {
      id: updatedUserId,
    });
  } catch (err) {
    next(err);
  }
};

export const putPassword = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.validated;
    const updatedUserId = await userRepositories.putPasswordById(id, {
      oldPassword,
      newPassword,
    });
    if (!updatedUserId) {
      return next(
        new InvariantError('Gagal memperbarui password. Password lama salah'),
      );
    }
    return response(res, 200, 'Berhasil memperbarui password', {
      id: updatedUserId,
    });
  } catch (err) {
    next(err);
  }
};

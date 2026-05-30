import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email Wajib diisi'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});
export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Nama lengkap wajib diisi')
      .min(3, 'Nama minimal 3 karakter')
      .max(255, 'Nama terlalu panjang'),
    userName: z.string().min(3, 'Username minimal 3 karakter'),
    email: z
      .string()
      .min(1, 'Email wajib diisi')
      .email('Format email tidak valid'),

    password: z
      .string()
      .min(1, 'Password wajib diisi')
      .min(8, 'Password minimal 8 karakter')
      .regex(/[A-Z]/, 'Password harus mengandung minimal 1 huruf kapital')
      .regex(/[0-9]/, 'Password harus mengandung minimal 1 angka'),

    confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  });

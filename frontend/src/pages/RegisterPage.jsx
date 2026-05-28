import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import FormInput from '@/components/ui/form/FormInput';
import PasswordInput from '@/components/ui/form/PasswordInput';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { registerSchema } from '@/lib/validation/auth-validation';
import { useRegister } from '@/hooks/register-hook';
const RegisterPage = () => {
  const [serverError, setServerError] = useState('');
  const { mutate, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const { email, password, fullName } = data;

      const payload = {
        fullName,
        email,
        password,
      };
      mutate(payload);
    } catch (err) {
      const message = err?.response?.data?.message;

      setServerError(message);
      reset({
        fullName: data.fullName,
        email: data.email,
        password: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <>
      <section className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 flex flex-col gap-6  rounded-xl shadow-custom">
          {/* Heading */}
          <div className="w-full">
            <h1 className="text-2xl font-bold text-blue-600 text-center mb-1">
              Buat Akun Baru
            </h1>
            <p className="text-sm text-center text-gray-500 font-normal">
              Mulai perjalanan kesehatan jantung kamu
            </p>
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg bg-red-50 border border-red-200">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-500 shrink-0 mt-0.5"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            noValidate
          >
            <FormInput
              label="Nama Lengkap"
              id="fullName"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              error={errors.fullName?.message}
              {...register('fullName')}
            />
            <FormInput
              label="Email Address"
              id="email"
              type="email"
              placeholder="example@gmail.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <PasswordInput
              label="Password"
              id="password"
              placeholder="Min. 6 karakter"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register('password')}
            />
            <PasswordInput
              label="Konfirmasi Password"
              id="confirmPassword"
              placeholder="Ulangi password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-1 cursor-pointer"
            >
              {isPending ? <Spinner /> : 'Daftar Sekarang'}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500">
            Sudah punya akun?{' '}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;

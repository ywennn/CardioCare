import NavLogo from '@/components/ui/navbar/NavLogo';
import FormInput from '@/components/ui/form/FormInput';
import PasswordInput from '@/components/ui/form/PasswordInput';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '@/lib/validation/auth-validation';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await login(data);
      navigate('/dashboard');
    } catch (err) {
      const status = err?.response?.status;
      reset({ email: '', password: '' });
      if (status === 401) {
        setServerError('Email atau password yang kamu masukkan salah.');
      } else {
        setServerError('Terjadi kesalahan. Silakan coba lagi.');
      }
    } finally {
      reset({ email: '', password: '' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 max-w-full mx-auto flex items-center justify-center border-slate-200 shadow-[0_1px_12px_rgba(37,99,235,0.07)] py-4">
        <NavLogo size="44" height="44" text="text-[32px]" />
      </header>
      <section className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-6 flex flex-col gap-6 mt-20 rounded-xl shadow-custom">
          <div className="w-full">
            <h1 className="text-2xl font-bold text-blue-600 text-center mb-0.5">
              Welcome Back
            </h1>
          </div>

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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormInput
              label="Email Address"
              id="email"
              placeholder="example@gmail.com"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <PasswordInput
              label="Password"
              id="password"
              placeholder="*******"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />
            <Button
              disabled={isSubmitting ? true : false}
              type="submit"
              className={`bg-blue-600 mt-4 cursor-pointer`}
            >
              {isSubmitting ? <Spinner /> : 'Masuk'}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Belum punya akun?{' '}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
            >
              Daftar gratis
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default LoginPage;

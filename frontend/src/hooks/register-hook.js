import { registerUser } from '../services/auth-service';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('Akun Berhasil dibuat. Silahkan login!', {
        style: {
          background: '#eff6ff',
          color: '#1e3a8a',
          border: '1px solid #bfdbfe',
          textAlign: 'center',
        },
      });
      navigate('/login');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Register gagal');
    },
  });
};

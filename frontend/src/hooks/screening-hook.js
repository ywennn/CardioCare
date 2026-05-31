import {
  createScreening,
  exportScreeningResult,
} from '@/services/screening-service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { screeningResult } from '@/services/screening-service';
import { useQuery } from '@tanstack/react-query';

export const useScreening = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createScreening,
    onSuccess: (res) => {
      toast.success('Berhasil wok', {
        style: {
          background: '#eff6ff',
          color: '#1e3a8a',
          border: '1px solid #bfdbfe',
          textAlign: 'center',
        },
      });
      console.log('response:', res);
      console.log('data:', res?.data);
      const screeningId = res?.data?.data?.screeningId;
      console.log('screeningId:', screeningId);
      navigate(`/screening/result/${screeningId}`);
    },
  });
};

export const useScreeningDetail = (screeningId) => {
  return useQuery({
    queryKey: ['screening', screeningId],
    queryFn: () => screeningResult(screeningId),
    enabled: !!screeningId,
  });
};

export const useExportScreening = () => {
  return useMutation({
    mutationFn: (screeningId) => exportScreeningResult(screeningId),
    onSuccess: (res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `skrining-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: () => {
      toast.error('Gagal mengunduh PDF.');
    },
  });
};

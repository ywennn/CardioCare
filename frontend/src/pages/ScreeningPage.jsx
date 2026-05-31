import { User, RotateCcw, Stethoscope, Dumbbell } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import screeningSchema from '@/lib/validation/screening-validation';
import { useScreening } from '@/hooks/screening-hook';
import { Loader2 } from 'lucide-react';
import { forwardRef } from 'react';

export default function ScreeningPage() {
  const { mutate, isError, error, isPending } = useScreening();
  const numberRegister = {
    setValueAs: (v) => (v === '' ? undefined : Number(v)),
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(screeningSchema),
    defaultValues: {
      age: undefined,
      gender: undefined,
      weight: undefined,
      height: undefined,
      systolicPressure: undefined,
      diastolicPressure: undefined,
      cholesterolLevel: undefined,
      glucoseLevel: undefined,
      smokingStatus: undefined,
      alcoholStatus: undefined,
      activityStatus: undefined,
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <MainLayout title="Skrining Risiko">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Form Skrining Risiko Jantung
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Isi data kesehatan dasar Anda untuk mendapatkan analisis prediksi
            risiko penyakit jantung oleh AI.
          </p>
        </div>
        {isError && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error.response.data.message}
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-3xl border bg-white p-8 shadow-sm"
        >
          <SectionTitle icon={User} title="Data Pribadi" />

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Usia (Tahun)"
              name="age"
              type="number"
              error={errors.age?.message}
              placeholder="Contoh: 45"
              {...register('age', numberRegister)}
            />

            <Select
              label="Jenis Kelamin"
              name="gender"
              type="number"
              error={errors.gender?.message}
              {...register('gender', { valueAsNumber: true })}
              options={[
                { value: '1', label: 'Laki-laki' },
                { value: '2', label: 'Perempuan' },
              ]}
            />

            <Input
              label="Berat Badan (kg)"
              name="weight"
              type="number"
              error={errors.weight?.message}
              placeholder="Contoh: 70"
              {...register('weight', numberRegister)}
            />

            <Input
              label="Tinggi Badan (cm)"
              name="height"
              type="number"
              error={errors.height?.message}
              placeholder="Contoh: 170"
              {...register('height', numberRegister)}
            />
          </div>

          <SectionTitle icon={Stethoscope} title="Pemeriksaan Kesehatan" />

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Tekanan Darah Sistolik (mmHg)"
              name="systolicPressure"
              placeholder="Contoh: 120"
              type="number"
              error={errors.systolicPressure?.message}
              helper="Nilai atas tekanan darah saat jantung memompa."
              {...register('systolicPressure', numberRegister)}
            />

            <Input
              label="Tekanan Darah Diastolik (mmHg)"
              name="diastolicPressure"
              placeholder="Contoh: 80"
              type="number"
              error={errors.diastolicPressure?.message}
              helper="Nilai bawah tekanan darah saat jantung istirahat."
              {...register('diastolicPressure', numberRegister)}
            />

            <Select
              label="Kadar Kolesterol"
              name="cholesterolLevel"
              error={errors.cholesterolLevel?.message}
              options={[
                { value: '1', label: 'Normal' },
                { value: '2', label: 'Di atas normal' },
                { value: '3', label: 'Tinggi' },
              ]}
              {...register('cholesterolLevel', numberRegister)}
            />

            <Select
              label="Kadar Glukosa (Gula Darah)"
              name="glucoseLevel"
              error={errors.glucoseLevel?.message}
              options={[
                { value: '1', label: 'Normal' },
                { value: '2', label: 'Di atas normal' },
                { value: '3', label: 'Tinggi' },
              ]}
              {...register('glucoseLevel', numberRegister)}
            />
          </div>

          <SectionTitle icon={Dumbbell} title="Gaya Hidup" />

          <div className="grid gap-5 md:grid-cols-3">
            <Select
              label="Status Merokok"
              error={errors.smokingStatus?.message}
              name="smokingStatus"
              options={[
                { value: '0', label: 'Tidak Merokok' },
                { value: '1', label: 'Merokok' },
              ]}
              {...register('smokingStatus', numberRegister)}
            />

            <Select
              label="Konsumsi Alkohol"
              name="alcoholStatus"
              error={errors.alcoholStatus?.message}
              options={[
                { value: '0', label: 'Tidak' },
                { value: '1', label: 'Ya' },
              ]}
              {...register('alcoholStatus', numberRegister)}
            />

            <Select
              label="Aktivitas Fisik"
              name="activityStatus"
              error={errors.activityStatus?.message}
              options={[
                { value: '0', label: 'Tidak Aktif' },
                { value: '1', label: 'Aktif' },
              ]}
              {...register('activityStatus', numberRegister)}
            />
          </div>

          <div className="mt-10 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              <RotateCcw size={16} />
              Reset Form
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending && <Loader2 size={15} className="animate-spin" />}
              {isPending ? 'Memproses...' : 'Cek Risiko Jantung'}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="mb-5 mt-8 first:mt-0">
      <div className="mb-4 flex items-center gap-2">
        <Icon size={20} className="text-blue-700" />
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="h-px bg-gray-100" />
    </div>
  );
}

const Input = forwardRef(function Input(
  { label, placeholder, helper, error, ...rest },
  ref,
) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-800">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="number"
        ref={ref}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-100 ${
          error
            ? 'border-red-400 focus:border-red-400'
            : 'border-gray-300 focus:border-blue-600'
        }`}
        {...rest}
      />
      {helper && <p className="mt-2 text-xs text-gray-400">{helper}</p>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

const Select = forwardRef(function Select(
  { label, options, error, ...rest },
  ref,
) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-800">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        ref={ref}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-100 ${
          error
            ? 'border-red-400 focus:border-red-400'
            : 'border-gray-300 focus:border-blue-600'
        }`}
        {...rest}
      >
        <option value="">Pilih Status</option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

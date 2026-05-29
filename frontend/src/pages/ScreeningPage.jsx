import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, HeartPulse, User, RotateCcw, Stethoscope, Dumbbell } from 'lucide-react';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';
import api from '@/services/api';

const initialForm = {
  age: '',
  gender: '',
  height: '',
  weight: '',
  systolicPressure: '',
  diastolicPressure: '',
  cholesterolLevel: '',
  glucoseLevel: '',
  smokingStatus: '',
  alcoholStatus: '',
  activityStatus: '',
};

export default function ScreeningPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setForm(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = Object.values(form).some((value) => value === '');

    if (isEmpty) {
      toast.error('Semua field wajib diisi.');
      return;
    }

    const payload = {
      age: Number(form.age),
      gender: Number(form.gender),
      height: Number(form.height),
      weight: Number(form.weight),
      systolicPressure: Number(form.systolicPressure),
      diastolicPressure: Number(form.diastolicPressure),
      cholesterolLevel: Number(form.cholesterolLevel),
      glucoseLevel: Number(form.glucoseLevel),
      smokingStatus: Number(form.smokingStatus),
      alcoholStatus: Number(form.alcoholStatus),
      activityStatus: Number(form.activityStatus),
    };

    try {
      setLoading(true);

      const res = await api.post('/screening', payload);

      toast.success('Skrining berhasil diproses.');

      const screeningId =
        res?.data?.data?.id || res?.data?.data?.screeningId || res?.data?.id;

      if (screeningId) {
        navigate(`/screening/result/${screeningId}`);
      } else {
        navigate('/history');
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          'Skrining gagal. Pastikan backend dan token login sudah aktif.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Skrining Risiko">
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

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border bg-white p-8 shadow-sm"
        >
          <SectionTitle icon={User} title="Data Pribadi" />

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Usia (Tahun)"
              name="age"
              placeholder="Contoh: 45"
              value={form.age}
              onChange={handleChange}
            />

            <Select
              label="Jenis Kelamin"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              options={[
                { value: '1', label: 'Laki-laki' },
                { value: '2', label: 'Perempuan' },
              ]}
            />

            <Input
              label="Berat Badan (kg)"
              name="weight"
              placeholder="Contoh: 70"
              value={form.weight}
              onChange={handleChange}
            />

            <Input
              label="Tinggi Badan (cm)"
              name="height"
              placeholder="Contoh: 170"
              value={form.height}
              onChange={handleChange}
            />
          </div>

          <SectionTitle icon={Stethoscope} title="Pemeriksaan Kesehatan" />

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Tekanan Darah Sistolik (mmHg)"
              name="systolicPressure"
              placeholder="Contoh: 120"
              helper="Nilai atas tekanan darah saat jantung memompa."
              value={form.systolicPressure}
              onChange={handleChange}
            />

            <Input
              label="Tekanan Darah Diastolik (mmHg)"
              name="diastolicPressure"
              placeholder="Contoh: 80"
              helper="Nilai bawah tekanan darah saat jantung istirahat."
              value={form.diastolicPressure}
              onChange={handleChange}
            />

            <Select
              label="Kadar Kolesterol"
              name="cholesterolLevel"
              value={form.cholesterolLevel}
              onChange={handleChange}
              options={[
                { value: '1', label: 'Normal' },
                { value: '2', label: 'Di atas normal' },
                { value: '3', label: 'Tinggi' },
              ]}
            />

            <Select
              label="Kadar Glukosa (Gula Darah)"
              name="glucoseLevel"
              value={form.glucoseLevel}
              onChange={handleChange}
              options={[
                { value: '1', label: 'Normal' },
                { value: '2', label: 'Di atas normal' },
                { value: '3', label: 'Tinggi' },
              ]}
            />
          </div>

          <SectionTitle icon={Dumbbell} title="Gaya Hidup" />

          <div className="grid gap-5 md:grid-cols-3">
            <Select
              label="Status Merokok"
              name="smokingStatus"
              value={form.smokingStatus}
              onChange={handleChange}
              options={[
                { value: '0', label: 'Tidak Merokok' },
                { value: '1', label: 'Merokok' },
              ]}
            />

            <Select
              label="Konsumsi Alkohol"
              name="alcoholStatus"
              value={form.alcoholStatus}
              onChange={handleChange}
              options={[
                { value: '0', label: 'Tidak' },
                { value: '1', label: 'Ya' },
              ]}
            />

            <Select
              label="Aktivitas Fisik"
              name="activityStatus"
              value={form.activityStatus}
              onChange={handleChange}
              options={[
                { value: '0', label: 'Tidak Aktif' },
                { value: '1', label: 'Aktif' },
              ]}
            />
          </div>

          <div className="mt-10 flex justify-end gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              <RotateCcw size={16} />
              Reset Form
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Memproses...' : 'Cek Risiko Jantung'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
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

function Input({ label, name, value, onChange, placeholder, helper }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-800">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />
      {helper && <p className="mt-2 text-xs text-gray-400">{helper}</p>}
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-800">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      >
        <option value="">Pilih Status</option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
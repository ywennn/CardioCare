import {
  User,
  Mail,
  ShieldCheck,
  Pencil,
  Lock,
  AlertTriangle,
  Camera,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function ProfilePage() {
  return (
    <DashboardLayout title="Profil">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Profile Card */}

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/200"
                  alt="avatar"
                  className="h-28 w-28 rounded-full border-4 border-blue-600 object-cover"
                />

                <button className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-white shadow-lg">
                  <Camera size={16} />
                </button>
              </div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                Budi Darmawan
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                budi.darmawan@email.com
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                <ShieldCheck size={16} />
                Akun Terverifikasi
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-400">Terdaftar Sejak</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    Januari 2024
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Skrining</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    12 Kali
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}

          <div className="space-y-6">
            {/* Edit Profile */}

            <div className="rounded-3xl border bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b px-6 py-4">
                <Pencil size={18} />
                <h3 className="font-semibold text-gray-900">
                  Edit Profil
                </h3>
              </div>

              <div className="p-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <Input
                    label="Nama Lengkap"
                    value="Budi Darmawan"
                  />

                  <Input
                    label="Alamat Email"
                    value="budi.darmawan@email.com"
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800">
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>

            {/* Password */}

            <div className="rounded-3xl border bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b px-6 py-4">
                <Lock size={18} />
                <h3 className="font-semibold text-gray-900">
                  Ubah Password
                </h3>
              </div>

              <div className="p-6">
                <div className="space-y-5">
                  <Input
                    type="password"
                    label="Password Lama"
                    value="12345678"
                  />

                  <div className="grid gap-5 md:grid-cols-2">
                    <Input
                      type="password"
                      label="Password Baru"
                      placeholder="Min. 8 karakter"
                    />

                    <Input
                      type="password"
                      label="Konfirmasi Password Baru"
                      placeholder="Ulangi password baru"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="rounded-xl bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-500">
                    Ubah Password
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Area */}

            <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={20}
                  className="mt-0.5 text-red-600"
                />

                <div>
                  <h3 className="font-bold text-red-700">
                    Area Berbahaya
                  </h3>

                  <p className="mt-2 text-sm text-red-600">
                    Setelah Anda menghapus akun, tidak ada jalan kembali.
                    Harap berhati-hati.
                  </p>

                  <button className="mt-4 text-sm font-semibold text-red-700 hover:underline">
                    Hapus Akun Saya
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Input({
  label,
  value = '',
  placeholder = '',
  type = 'text',
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}
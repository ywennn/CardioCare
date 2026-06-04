import { useState } from 'react';
import { ShieldCheck, Pencil, Lock, AlertTriangle, User } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useProfile } from '@/hooks/profile-hook';

function ProfileForm({ profile, onUpdate, loading, error, success }) {
  const [form, setForm] = useState({
    fullName: profile?.fullName || '',
    email: profile?.email || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nama Lengkap</Label>
          <Input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Alamat Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Masukkan email"
          />
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      {success && (
        <p className="mt-3 text-sm text-emerald-600">
          Profil berhasil diperbarui!
        </p>
      )}

      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </Button>
      </div>
    </form>
  );
}

function PasswordForm({ onUpdate, loading, error, success }) {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) return;
    onUpdate({ oldPassword: form.oldPassword, newPassword: form.newPassword });
    setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const mismatch =
    form.newPassword &&
    form.confirmPassword &&
    form.newPassword !== form.confirmPassword;

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="oldPassword">Password Lama</Label>
          <Input
            id="oldPassword"
            name="oldPassword"
            type="password"
            value={form.oldPassword}
            onChange={handleChange}
            placeholder="Masukkan password lama"
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="newPassword">Password Baru</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Min. 8 karakter"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Ulangi password baru"
            />
          </div>
        </div>
      </div>

      {mismatch && (
        <p className="mt-3 text-sm text-red-500">Password baru tidak cocok</p>
      )}
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      {success && (
        <p className="mt-3 text-sm text-emerald-600">
          Password berhasil diperbarui!
        </p>
      )}

      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          variant="outline"
          disabled={loading || !!mismatch}
        >
          {loading ? 'Menyimpan...' : 'Ubah Password'}
        </Button>
      </div>
    </form>
  );
}

export default function ProfilePage() {
  const {
    profile,
    loading,
    error,
    handleUpdateProfile,
    profileLoading,
    profileError,
    profileSuccess,
    handleUpdatePassword,
    passwordLoading,
    passwordError,
    passwordSuccess,
  } = useProfile();

  if (loading) {
    return (
      <MainLayout title="Profil">
        <div className="flex h-64 items-center justify-center text-gray-400">
          Memuat profil...
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout title="Profil">
        <div className="flex h-64 items-center justify-center text-red-500">
          {error}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Profil">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <User size={36} />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-900">
                    {profile?.fullName}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                  >
                    <ShieldCheck size={12} />
                    Terverifikasi
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-gray-500">{profile?.email}</p>
              </div>

              <div className="hidden gap-8 text-center sm:flex">
                <div>
                  <p className="text-xs text-gray-400">Terdaftar Sejak</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {profile?.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString(
                          'id-ID',
                          {
                            month: 'long',
                            year: 'numeric',
                          },
                        )
                      : '-'}
                  </p>
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div>
                  <p className="text-xs text-gray-400">Total Skrining</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {profile?.totalScreening ?? 0} Kali
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile — key={profile?.id} agar form re-mount saat data siap */}
        <Card key={profile?.id}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <Pencil size={16} />
              Edit Profil
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <ProfileForm
              profile={profile}
              onUpdate={handleUpdateProfile}
              loading={profileLoading}
              error={profileError}
              success={profileSuccess}
            />
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <Lock size={16} />
              Ubah Password
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <PasswordForm
              onUpdate={handleUpdatePassword}
              loading={passwordLoading}
              error={passwordError}
              success={passwordSuccess}
            />
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle
                size={20}
                className="mt-0.5 shrink-0 text-red-600"
              />
              <div>
                <h3 className="font-bold text-red-700">Area Berbahaya</h3>
                <p className="mt-1 text-sm text-red-600">
                  Setelah Anda menghapus akun, tidak ada jalan kembali. Harap
                  berhati-hati.
                </p>
                <Button
                  variant="ghost"
                  className="mt-3 h-auto p-0 text-sm font-semibold text-red-700 hover:bg-transparent hover:underline"
                >
                  Hapus Akun Saya
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

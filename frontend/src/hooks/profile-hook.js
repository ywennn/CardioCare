import { useState, useEffect } from 'react';
import { getMe, updateProfile, updatePassword } from '../services/user-service';
export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [profileSuccess, setProfileSuccess] = useState(false);

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getMe();
        setProfile(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Gagal memuat profil');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (data) => {
    try {
      setProfileLoading(true);
      setProfileError(null);
      setProfileSuccess(false);
      await updateProfile(data);
      setProfile((prev) => ({ ...prev, ...data }));
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      setProfileError(
        err.response?.data?.message || 'Gagal memperbarui profil',
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const handleUpdatePassword = async (data) => {
    try {
      setPasswordLoading(true);
      setPasswordError(null);
      setPasswordSuccess(false);
      await updatePassword(data);
      setPasswordSuccess(true);
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) {
      setPasswordError(
        err.response?.data?.message || 'Gagal memperbarui password',
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  return {
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
  };
}

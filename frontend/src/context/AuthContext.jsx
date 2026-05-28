import api from '../services/api';
import storage from '../utils/storage';
import { AuthContext } from './Context';
import { useState, useEffect, useCallback } from 'react';
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setIsError] = useState('');
  useEffect(() => {
    const init = async () => {
      const token = storage.getAccessToken();
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const user = await api.get('/users/me');
        setUser(user.data.data);
      } catch (err) {
        setIsError(err);
        storage.clearToken();
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const login = useCallback(async (data) => {
    const res = await api.post('/auth/login', data);
    const { accessToken, refreshToken } = res.data.data;
    storage.setAccessToken(accessToken);
    storage.setRefreshToken(refreshToken);
    const profile = await api.get('/users/me');
    setUser(profile.data.data);
  }, []);

  const logout = useCallback(async () => {
    try {
      const refreshToken = storage.getRefreshToken();
      await api.delete('/auth/logout', { data: { refreshToken } });
    } catch (error) {
      setIsError(error);
    } finally {
      storage.clearToken();
      setUser(null);
    }
  }, []);
  const value = {
    user,
    error,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    setUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

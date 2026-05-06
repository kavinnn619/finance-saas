import React, { createContext, useContext, useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';

  interface User { id: string; email: string; role: string; }
  interface AuthContextType { user: User | null; isAuthenticated: boolean; login: (token: string, user: User) => void;
  logout: () => void; }

  const AuthContext = createContext<AuthContextType>({} as AuthContextType);

  export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) { setUser(JSON.parse(storedUser)); setIsAuthenticated(true); }
    }, []);

    const login = (token: string, user: User) => {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
    };

    const logout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    };

    return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
  };

  export const useAuth = () => useContext(AuthContext);

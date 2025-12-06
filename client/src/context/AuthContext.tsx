import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, type UserAPI } from "../services/api";

interface AuthContextType {
  user: UserAPI | null;
  loading: boolean;
  signin: (username: string, password: string) => Promise<void>;
  signup: (data: {
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  }) => Promise<void>;
  signout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserAPI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signin = async (username: string, password: string) => {
    const user = await authService.signin(username, password);
    setUser(user);
  };

  const signup = async (data: {
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  }) => {
    const user = await authService.signup(data);
    setUser(user);
  };

  const signout = async () => {
    await authService.signout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
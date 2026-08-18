'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  address?: string;
  city?: string;
  country?: string;
  password: string;
  cardNumber?: string;
  expirationDate?: string;
  swish?: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[] | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser') || 'null'));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        setUsers,
        email,
        setEmail,
        password,
        setPassword,
        passwordAgain,
        setPasswordAgain,
        passwordError,
        setPasswordError,
        emailError,
        setEmailError,
        emailRegex,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

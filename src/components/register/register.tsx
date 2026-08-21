'use client';
import styles from './register.module.css';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../context/auth.context';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { User } from '../../app/types/user';

export default function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const { currentUser, setCurrentUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setEmailError(null);
    let anyError = false;

    if (password !== passwordAgain) {
      setPasswordError('Passwords are not matching');
      anyError = true;
    }

    if (password.length < 8) {
      setPasswordError('Password must include 8 or more characters');
      anyError = true;
    }

    if (
      (password !== passwordAgain && password.length < 8) ||
      (password !== passwordAgain && passwordAgain.length < 8)
    ) {
      setPasswordError('Passwords must include 8 or more characters and match');
      anyError = true;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      anyError = true;
    }

    const allUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (allUsers.some((user) => user.email === email)) {
      setEmailError('Email address already in use');
      anyError = true;
    }

    if (anyError) return;

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      passwordHash,
    };

    localStorage.setItem('users', JSON.stringify([...allUsers, newUser]));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setCurrentUser(newUser);
  };

  return (
    <>
      {!currentUser ? (
        <div>
          <h1 className='fs-2 mb-5 mt-2'>Register</h1>
          <Form className={styles.form} onSubmit={handleSubmit} noValidate>
            <Form.Group className='mb-2' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {<p className={styles.errorMessage}>{emailError}</p>}
            <Form.Group className='mb-2' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-2' controlId='passwordAgain'>
              <Form.Label>Password again</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password again'
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.target.value)}
              />
            </Form.Group>
            {<p className={styles.errorMessage}>{passwordError}</p>}
            <div className='d-flex justify-content-center'>
              <Button
                variant='primary'
                type='submit'
                disabled={!email || !password || !passwordAgain}>
                Register
              </Button>
            </div>
            <div className='d-flex justify-content-center mt-3'>
              <p>Already have an account? </p>
              <Link className='ms-1' href='/login'>
                Log in
              </Link>
            </div>
          </Form>
        </div>
      ) : (
        router.push('/account')
      )}
    </>
  );
}

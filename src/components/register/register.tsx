'use client';
import styles from './register.module.css';
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../context/auth.context';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { currentUser, setCurrentUser } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (password !== passwordAgain) {
      setErrorMessage('Passwords are not matching');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must include 8 or more characters');
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');

    if (allUsers.some((user: { email: string }) => user.email === email)) {
      setErrorMessage('Email address already in use');
      return;
    }
    const newUser = {
      email,
      password,
    };
    localStorage.setItem('users', JSON.stringify([...allUsers, newUser]));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setCurrentUser(newUser);
    router.push('/');
  };

  return (
    <>
      {!currentUser ? (
        <div>
          <h1 className='fs-2 mb-5 mt-5'>Register</h1>
          <Form className={styles.form} onSubmit={handleSubmit}>
            <Form.Group className='mb-4' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-4' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-4' controlId='passwordAgain'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password again'
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.target.value)}
              />
            </Form.Group>
            {<p className={styles.errorMessage}>{errorMessage}</p>}
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
        <h1>You are already logged in</h1>
      )}
    </>
  );
}

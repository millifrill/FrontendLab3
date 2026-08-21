'use client';
import styles from './login.module.css';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../context/auth.context';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { User } from '../../app/types/user';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { currentUser, setCurrentUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    const allUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = allUsers.find((user) => user.email === email);

    if (!user) {
      setErrorMessage('Incorrect email address or password');
      return;
    }

    const correctPassword = await bcrypt.compare(password, user.passwordHash);
    if (!correctPassword) {
      setErrorMessage('Incorrect email address or password');
      return;
    }
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  return (
    <>
      {!currentUser ? (
        <div>
          <h1 className='fs-2 mb-5 mt-2'>Log in</h1>
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

            <Form.Group className='mb-2' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {<p className={styles.errorMessage}>{errorMessage}</p>}
            <div className='d-flex justify-content-center'>
              <Button
                variant='primary'
                type='submit'
                disabled={!email || !password}>
                Log in
              </Button>
            </div>
            <div className='d-flex justify-content-center mt-3'>
              <p>Don't have an account yet? </p>
              <Link className='ms-1' href='/register'>
                Register
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

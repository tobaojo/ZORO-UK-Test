'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ZORO from '../../public/images/zorouk.jpeg';

const LoginForm = () => {
  // Setting state for the username and password fields
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  // router hook to navigate
  const router = useRouter();

  // handle submit function for when the form is submitted
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // fetch request POST to the api endpoint and send the details as json
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      // if the login is success go to the /user page
      if (response.ok) {
        const data = await response.json();
        router.push('/user');
      } else {
        // else get the response from the api
        const data = await response.json();
        // and set error state
        setError(data.error);
      }
    } catch (error) {
      // or display this error message
      setError('an error occurred');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-80'>
        <h1 className='text-xl mb-4'>Welcome to ZORO test</h1>
        <Image src={ZORO} alt='ZORO-LOGO' className='mx-auto mb-2' />
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700'>Username</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username...'
              className='w-full p-2 border border-slate-300 rounded mt-1'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-slate-700'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password...'
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
          </div>
          {/* if there is an error, display it */}
          {error && <p className='text-red-500'>{error}</p>}
          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-900 '
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

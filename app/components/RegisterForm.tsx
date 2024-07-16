'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  // setting state for the fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // router hook to navigate
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, name, email }),
      });

      if (response.ok) {
        setSuccess('Register successfully');
        setUsername('');
        setPassword('');
        setEmail('');
        setName('');

        // navigate back to home
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-90'>
        <h2 className='text-xl mb-4'>Register to Zoro</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor='name'>
              Name:
            </label>
            <input
              type='text'
              name='name'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2 border border-slate-300 rounded mt-1'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor='username'>
              Username:
            </label>
            <input
              type='text'
              name='username'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full p-2 border border-slate-300 rounded mt-1'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700'>
              Email:
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-700'>
              Password:
            </label>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
          </div>
          {error && <p className='text-red-500 mb-4'>{error}</p>}
          {success && <p className='text-green-500 mb-4'>{success}</p>}
          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-900'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

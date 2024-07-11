'use client';

import { useState, useEffect } from 'react';

type User = {
  username: string;
  email: string;
  name: string;
};

const UserInfo = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user');
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      {user ? (
        <div className='bg-white p-8 rounded shadow-md w-80'>
          <h1 className='text-xl mb-4'>User Information</h1>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserInfo;

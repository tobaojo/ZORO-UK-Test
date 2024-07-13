'use client';

import { useState, useEffect } from 'react';

// type User
type User = {
  username: string;
  email: string;
  name: string;
};

const UserInfo = () => {
  // state is tyype user or null for inital set up
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      // GET from user endpoint
      const response = await fetch('/api/user');

      // if response is ok get the data and  set state
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        throw new Error('Failed to fetch data');
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      {user ? (
        <div className='bg-white p-8 rounded shadow-md w-80'>
          <h1 className='text-xl mb-4'>Welcome</h1>
          <p>
            <span className='text-blue-600'>Username:</span> {user.username}
          </p>
          <p>
            <span className='text-blue-600'>Email:</span> {user.email}
          </p>
          <p>
            <span className='text-blue-600'>Name:</span> {user.name}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserInfo;

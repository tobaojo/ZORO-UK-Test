import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export const generateToken = (username: string) => {
  if (!SECRET_KEY) {
    console.error('Please create a secret key in your .env');
    return;
  }
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  if (!SECRET_KEY) {
    console.error('Please create a secret key in your .env');
    return;
  }
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

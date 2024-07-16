import jwt from 'jsonwebtoken';

// get secrect from .env
const SECRET_KEY = process.env.SECRET_KEY;

// function to create a new token based on username
export const generateToken = (username: string) => {
  if (!SECRET_KEY) {
    console.error('Please create a secret key in your .env');
    return;
  }
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
};

// function to verify the token is correct
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

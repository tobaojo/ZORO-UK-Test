import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../../app/components/LoginForm';
import mockRouter from 'next-router-mock';

jest.mock('next/navigation', () => require('next-router-mock'));
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));
describe('LoginForm', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
    Storage.prototype.setItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText('Username...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password...')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('handles form submission with valid data', async () => {
    const push = jest.fn();
    mockRouter.push = push;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'fake-token' }),
      }),
    ) as jest.Mock;

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('Username...'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password...'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
      expect(push).toHaveBeenCalledWith('/user?username=testuser');
    });
  });

  it('shows an error message on failed login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Invalid credentials' }),
      }),
    ) as jest.Mock;

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('Username...'), {
      target: { value: 'wronguser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password...'), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});

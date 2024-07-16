import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from '../../app/components/RegisterForm';
import mockRouter from 'next-router-mock';

jest.mock('next/navigation', () => require('next-router-mock'));
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

describe('Register Form', () => {
  it('renders the registration form', () => {
    render(<RegisterForm />);

    expect(screen.getByText('Register to Zoro')).toBeInTheDocument();
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('handles form submission with valid data', async () => {
    const push = jest.fn();
    mockRouter.push = push;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      }),
    ) as jest.Mock;

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(screen.getByText('Register successfully')).toBeInTheDocument();
      expect(push).toHaveBeenCalledWith('/');
    });
  });

  it('shows an error message on failed registration', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Invalid data' }),
      }),
    ) as jest.Mock;

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(screen.getByText('Invalid data')).toBeInTheDocument();
    });
  });
});

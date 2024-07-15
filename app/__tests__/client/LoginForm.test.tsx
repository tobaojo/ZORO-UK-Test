import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../../../app/components/LoginForm';
import { useRouter } from 'next/router';
import React from 'react';

jest.mock('next/router', () => require('next-router-mock'));
describe('LoginForm', () => {
  it('renders the login form', () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText('Username...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password...')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
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

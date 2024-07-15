import { createMocks } from 'node-mocks-http';
import { POST } from '../../app/api/login/route';
import { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma';
import { generateToken } from '../../lib/jwt';

jest.mock('../../lib/prisma', () => require('../../__mocks__/prisma'));
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));
jest.mock('../../lib/jwt', () => ({
  generateToken: jest.fn(() => 'mocked-token'),
}));

describe('/api/login API Endpoint', () => {
  it('returns success on valid credentials', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      username: 'username',
      password: 'hashedpassword',
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const { req } = createMocks({
      method: 'POST',
      body: { username: 'username', password: 'password' },
    });

    const nextRequest = new NextRequest('http://localhost/api/login', {
      method: req.method,
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(nextRequest);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual({ success: true, token: 'mocked-token' });
  });

  it('returns error on invalid request method', async () => {
    console.log('first');
    const { req } = createMocks({
      method: 'GET',
    });

    const nextRequest = new NextRequest('http://localhost/api/login', {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(nextRequest);

    expect(response.status).toBe(405);
    const data = await response.json();
    expect(data).toEqual({ error: 'Method Not Allowed' });
  });

  it('returns error on invalid credentials', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const { req } = createMocks({
      method: 'POST',
      body: { username: 'wrong', password: 'wrong' },
    });

    const nextRequest = new NextRequest('http://localhost/api/login', {
      method: req.method,
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(nextRequest);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data).toEqual({ error: 'Authentication failed' });
  });
});

import { createMocks } from 'node-mocks-http';
import { POST } from '../../app/api/register/route';
import { NextRequest } from 'next/server';
import prisma from '../../lib/prisma';

jest.mock('../../lib/prisma', () => require('../../__mocks__/prisma'));
jest.mock('bcrypt', () => ({
  hash: jest.fn(() => 'hashedpassword'),
  genSalt: jest.fn(() => 'somesalt'),
}));

describe('/api/register API Endpoint', () => {
  it('registers a new user successfully', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.create as jest.Mock).mockResolvedValue({
      username: 'testuser',
      email: 'test@example.com',
      name: 'Test User',
    });

    const { req } = createMocks({
      method: 'POST',
      body: {
        username: 'testuser',
        password: 'password',
        email: 'test@example.com',
        name: 'Test User',
      },
    });

    const nextRequest = new NextRequest('http://localhost/api/register', {
      method: req.method,
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(nextRequest);

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data).toEqual({
      success: true,
      user: {
        username: 'testuser',
        email: 'test@example.com',
        name: 'Test User',
      },
    });
  });

  it('returns an error if username already exists', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ username: 'testuser' });

    const { req } = createMocks({
      method: 'POST',
      body: {
        username: 'testuser',
        password: 'password',
        email: 'test@example.com',
        name: 'Test User',
      },
    });

    const nextRequest = new NextRequest('http://localhost/api/register', {
      method: req.method,
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(nextRequest);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data).toEqual({ error: 'Username already exists' });
  });
});

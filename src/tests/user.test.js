/* eslint-disable no-underscore-dangle */
import request from 'supertest';

import app from '../app';
import utils from './utils';

describe('User should be able to signup to the app', () => {
  it('Should create a User at "/api/v1/auth/signup" with POST if all request inputs are valid', async () => {
    const { status, body: { data } } = await request(app).post('/api/v1/auth/signup').send(utils.newUser);
    expect(status).toBeNumber().toEqual(201);
    expect(data).toBeObject().toContainKeys(['user']);
    expect(data.user).toBeObject().toContainKeys(['fullName', 'token', 'email', '_id', 'type', 'createdAt']);
    expect(data.user.status).toBeNumber().toEqual(201);
    expect(data.user.token).toBeString();
    expect(data.user._id).toBeString();
    expect(data.user.posts).toBeArray();
    expect(data.user.fullName).toBeString().toEqual(utils.newUser.fullName);
    expect(data.user.email).toBeString().toEqual(utils.newUser.email);
    expect(data.user.type).toBeString().toEqual('Client');
    expect(data.user.createdAt).toBeString();
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username, fullName, email or password fields are invalid', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/auth/signup');
    expect(status).toBeNumber().toEqual(400);
    expect(error).toBeObject().toContainKeys(['message(s)']);
    expect(error['message(s)']).toBeArray().toIncludeAllMembers([
      {
        msg: 'Please enter a valid email address',
        param: 'email',
        location: 'body',
      },
      {
        msg: 'Password should be at least a character long',
        param: 'password',
        location: 'body',
      },
      {
        msg: 'Password must be string data type',
        param: 'password',
        location: 'body',
      },
      {
        msg: 'Full name should be at least a character long',
        param: 'fullName',
        location: 'body',
      },
      {
        msg: 'Full name must be string data type',
        param: 'fullName',
        location: 'body',
      },
    ]);
  });

  it('Should NOT create a user at "/api/v1/auth/signup" if username or email is already registered', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/auth/signup').send(utils.user);
    expect(status).toBeNumber().toEqual(406);
    expect(error).toBeObject().toContainKeys(['message(s)']);
    expect(error['message(s)']).toBeString().toEqual(`Account already exists with email ${utils.user.email}, please sign in or sign up with a different email`);
  });
});

describe('User should be able to login to the app', () => {
  it('Should be able login a User at "/api/v1/auth/login" user and password fields are valid', async () => {
    const { status, body: { data } } = await request(app).post('/api/v1/auth/login').send({ email: utils.user.email, password: utils.user.password });
    expect(status).toBeNumber().toEqual(200);
    expect(data).toBeObject().toContainKeys(['user']);
    expect(data.user).toBeObject().toContainKeys(['fullName', 'token', 'email', '_id', 'type', 'updatedAt', 'createdAt']);
    expect(data.user._id).toString();
    expect(data.user.token).toString();
    expect(data.user.posts).toBeArray();
    expect(data.user.fullName).toBeString().toEqual(utils.user.fullName);
    expect(data.user.email).toBeString().toEqual(utils.user.email);
    expect(data.user.type).toBeString().toEqual('Client');
    expect(data.user.createdAt).toBeString();
    expect(data.user.updatedAt).toBeString();
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user or password fields are invalid', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/auth/login');
    expect(status).toBeNumber().toEqual(400);
    expect(error).toBeObject().toContainKeys(['message(s)']);
    expect(error['message(s)']).toBeArray().toIncludeAllMembers([
      {
        msg: 'Please enter a valid email address',
        param: 'email',
        location: 'body',
      },
      {
        msg: 'Password should be at least a character long',
        param: 'password',
        location: 'body',
      },
      {
        msg: 'Password must be string data type',
        param: 'password',
        location: 'body',
      },
    ]);
  });

  it('Should NOT login a user at "/api/v1/auth/login" if user is not registered', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/auth/login').send({ email: utils.user404.email, password: utils.user404.password });
    expect(status).toBeNumber().toEqual(404);
    expect(error).toBeObject().toContainKeys(['message(s)']);
    expect(error['message(s)']).toBeString().toEqual(`Account with ${utils.user404.email} does not exist, please sign up by creating an account`);
  });

  it('Should NOT login a User at "/api/v1/auth/login" if password is wrong', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/auth/login').send({ email: utils.user.email, password: 'wrong password' });
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeObject().toContainKeys(['message(s)']);
    expect(error['message(s)']).toBeString().toEqual('Password provided does not match user, please try again with the correct password');
  });
});

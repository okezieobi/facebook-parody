/* eslint-disable no-underscore-dangle */
import request from 'supertest';

import app from '../app';
import utils from './utils';

describe('Authorized User should be able to create a post', () => {
  it('Should be able to create a post at "/api/v1/posts" if all required input fields are valid', async () => {
    const { status, body: { data } } = await request(app).post('/api/v1/posts')
      .set('token', utils.token)
      .send(utils.newPost);
    expect(status).toBeNumber().toEqual(201);
    expect(data).toBeObject().toContainKeys(['post']);
    expect(data.post).toBeObject().toContainKeys(['title', 'status', 'body', 'updatedAt', '_id', 'createdAt']);
    expect(data.post.status).toBeNumber().toEqual(201);
    expect(data.post.title).toBeString().toEqual(utils.newPost.title);
    expect(data.post.body).toBeString().toEqual(utils.newPost.body);
    expect(data.post._id).toBeString();
    expect(data.post.createdAt).toBeString();
    expect(data.post.updatedAt).toBeString();
  });

  it('Should not create a post at "/api/v1/posts" if input fields are invalid', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/posts')
      .set('token', utils.token);
    expect(status).toBeNumber().toEqual(400);
    expect(error).toBeObject().toContainKeys(['message(s)']);
    expect(error['message(s)']).toBeArray().toIncludeAllMembers([
      {
        msg: 'Post title should be at least a character long',
        param: 'title',
        location: 'body',
      },
      {
        msg: 'Post title must be string data type',
        param: 'title',
        location: 'body',
      },
      {
        msg: 'Post body should be at least a character long',
        param: 'body',
        location: 'body',
      },
      {
        msg: 'Post body must be string data type',
        param: 'body',
        location: 'body',
      },
    ]);
  });

  it('Should not create a post at "/api/v1/posts" if token is falsy', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/posts')
      .send(utils.newPost);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeObject().toContainKeys(['message(s)']);
    expect(error['message(s)']).toBeArray().toIncludeAllMembers([
      {
        msg: 'Token does not match Json Web Token format',
        param: 'token',
        location: 'headers',
      },
    ]);
  });

  it('Should NOT create a post at at "/api/v1/posts" if user is not authorized', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/posts')
      .set('token', utils.token401)
      .send(utils.newPost);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeObject().toContainKeys(['message(s)']);
    expect(error['message(s)']).toBeString().toEqual('User not found, please sign up by creating an account or sign in');
  });
});

describe('Authorized User should be able to get all posts', () => {
  it('Should get all posts at "/api/v1/posts" if input all required fields are valid', async () => {
    const { status, body: { data } } = await request(app).get('/api/v1/posts')
      .set('token', utils.token);
    expect(status).toBeNumber().toEqual(200);
    expect(data).toBeObject().toContainKeys(['posts']);
    expect(data.posts).toBeArray();
  });

  it('Should not get posts at "/api/v1/posts" if token is falsy', async () => {
    const { status, body: { error } } = await request(app).get('/api/v1/posts');
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeObject().toContainKeys(['message(s)']);
    expect(error['message(s)']).toBeArray().toIncludeAllMembers([
      {
        msg: 'Token does not match Json Web Token format',
        param: 'token',
        location: 'headers',
      },
    ]);
  });

  it('Should NOT get all posts at at "/api/v1/entities" if User is not authorized', async () => {
    const { status, body: { error } } = await request(app).get('/api/v1/posts')
      .set('token', utils.token401);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeObject().toContainKeys(['message(s)']);
    expect(error['message(s)']).toBeString().toEqual('User not found, please sign up by creating an account or sign in');
  });
});

describe('Authorized User can get an specific post by its id at "/api/v1/posts/:id"', () => {
  it('Should get a specific post at "/api/v1/posts/:id" by its id', async () => {
    const { status, body: { data } } = await request(app).get(`/api/v1/posts/${utils.seed.postDoc._id}`)
      .set('token', utils.token);
    expect(status).toBeNumber().toEqual(200);
    expect(data).toBeObject().toContainKeys(['post']);
    expect(data.post).toBeObject().toContainKeys(['title', 'body', 'updatedAt', '_id', 'createdAt']);
    expect(data.post.title).toBeString().toEqual(utils.post.title);
    expect(data.post.body).toBeString().toEqual(utils.post.body);
    expect(data.post._id).toBeString();
    expect(data.post.createdAt).toBeString();
    expect(data.post.updatedAt).toBeString();
  });

  it('Should not get specific at "/api/v1/posts/:id" if token is falsy', async () => {
    const { status, body: { error } } = await request(app).get(`/api/v1/posts/${utils.seed.postDoc._id}`);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeObject().toContainKeys(['message(s)']);
    expect(error['message(s)']).toBeArray().toIncludeAllMembers([
      {
        msg: 'Token does not match Json Web Token format',
        param: 'token',
        location: 'headers',
      },
    ]);
  });

  it('Should NOT get a specific post at at "/api/v1/posts/:id" if User is not authorized', async () => {
    const { status, body: { error } } = await request(app).get(`/api/v1/posts/${utils.seed.postDoc._id}`)
      .set('token', utils.token401);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeObject().toContainKeys(['message(s)']);
    expect(error['message(s)']).toBeString().toEqual('User not found, please sign up by creating an account or sign in');
  });

  it('Should NOT get a specific post at at "/api/v1/posts/:id" if post is not found', async () => {
    const { status, body: { error } } = await request(app).get(`/api/v1/posts/${utils.user404Doc._id}`)
      .set('token', utils.token);
    expect(status).toBeNumber().toEqual(404);
    expect(error).toBeObject().toContainKeys(['message(s)']);
    expect(error['message(s)']).toBeString().toEqual('Post not found');
  });
});

describe('Authorized User can update an associated, specific post by its id at "/api/v1/posts/:id"', () => {
  it('Should update a specific associated post at "/api/v1/posts/:id" if all input fields are valid', async () => {
    const { status, body: { data } } = await request(app).put(`/api/v1/posts/${utils.seed.postDoc._id}`)
      .set('token', utils.token)
      .send(utils.newPost);
    expect(status).toBeNumber().toEqual(200);
    expect(data).toBeObject().toContainKeys(['post']);
    expect(data.post).toBeObject().toContainKeys(['title', 'body', 'updatedAt', '_id', 'createdAt']);
    expect(data.post.title).toBeString().toEqual(utils.newPost.title);
    expect(data.post.body).toBeString().toEqual(utils.newPost.body);
    expect(data.post._id).toBeString();
    expect(data.post.createdAt).toBeString();
    expect(data.post.updatedAt).toBeString();
  });

  it('Should not update associated, specific post at "/api/v1/posts/:id" if token is falsy', async () => {
    const { status, body: { error } } = await request(app).put(`/api/v1/posts/${utils.seed.postDoc._id}`)
      .send(utils.newPost);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeObject().toContainKeys(['message(s)']);
    expect(error['message(s)']).toBeArray().toIncludeAllMembers([
      {
        msg: 'Token does not match Json Web Token format',
        param: 'token',
        location: 'headers',
      },
    ]);
  });

  it('Should NOT update associated, specific post at at "/api/v1/posts/:id" if User is not authorized', async () => {
    const { status, body: { error } } = await request(app).put(`/api/v1/posts/${utils.seed.postDoc._id}`)
      .set('token', utils.token401).send(utils.newPost);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeObject().toContainKeys(['message(s)']);
    expect(error['message(s)']).toBeString().toEqual('User not found, please sign up by creating an account or sign in');
  });

  it('Should NOT update associated, specific post at at "/api/v1/posts/:id" if post is not found', async () => {
    const { status, body: { error } } = await request(app).put(`/api/v1/posts/${utils.seed.userDoc._id}`)
      .set('token', utils.token).send(utils.newPost);
    expect(status).toBeNumber().toEqual(404);
    expect(error).toBeObject().toContainKeys(['message(s)']);
    expect(error['message(s)']).toBeString().toEqual('Post not found');
  });
});

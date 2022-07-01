const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');

const githubLogin = async () => {
  const agent = request.agent(app);
  await agent.get('/api/v1/github/callback?code=42').redirects(1);
  return [agent];
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should not allow users who are not logged in to view posts', async () => {
    const res = await request(app).get('/api/v1/posts');
    expect(res.status).toEqual(401);
  });

  it('should allow users who are logged in to view posts', async () => {
    const [agent] = await githubLogin();
    const res = await agent.get('/api/v1/posts');
    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(1);
  });

  it('should not allow users who are not logged in to create posts', async () => {
    const res = await request(app).post('/api/v1/posts').send({ post: 'test' });
    expect(res.status).toEqual(401);
  });

  it('should allow users who are logged in to create posts', async () => {
    const [agent] = await githubLogin();
    const res = await agent.post('/api/v1/posts').send({ post: 'test' });
    expect(res.status).toEqual(200);
  });

  afterAll(() => {
    pool.end();
  });
});

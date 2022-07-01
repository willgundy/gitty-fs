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

  it.skip('should redirect to the github page upon login', async () => {
    const res = await request(app).get('/api/v1/github/login');

    expect(res.header.location).toMatch(
      'https://github.com/login/oauth/authorize?client_id=298ff8f9fd0701e4ddce&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback'
    );
  });

  it('should login and redirect new Github user', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'test_user',
      exp: expect.any(Number),
      iat: expect.any(Number),
      email: 'test@test.com',
      avatar: expect.any(String),
    });
  });

  it('should remove user session on calling delete', async () => {
    const [agent] = await githubLogin();
    const res = await agent.get('/api/v1/posts');
    expect(res.status).toEqual(200);

    const loggedOut = await agent.delete('/api/v1/github/sessions');

    expect(loggedOut.body).toEqual({
      message: 'Signed out successfully!',
      success: true
    });
  });

  afterAll(() => {
    pool.end();
  });
});

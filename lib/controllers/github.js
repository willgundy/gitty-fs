const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const GithubUser = require('../models/GithubUsers');
const { getTokenUsingGithubCode, getGithubProfileUsingToken } = require('../services/github');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`);
  })
    
  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;
      const token = await getTokenUsingGithubCode(code);
      const profile = await getGithubProfileUsingToken(token);

      //still need to add find by user name to githubuser controller
      let user = await GithubUser.findUserByName(profile.login);
      console.log(user);

      if(!user) {
        user = await GithubUser.insert({
          username: profile.login,
          email: profile.email,
          avatar: profile.avatar_url
        });
      }

      const payload = jwt.sign({ ...user }, process.env.JWT_SECRET, { expiresIn: '1 day', });

      res.cookie(process.env.COOKIE_NAME, payload, { httpOnly: true, maxAge: ONE_DAY_IN_MS }).redirect('/api/v1/github/dashboard');
    } catch(e) {
      next(e);
    }
  })
    
  .get('/dashboard', authenticate, async (req, res) => {
    res.json(req.user);
  })
    
  .delete('/sessions', (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME).json({ success: true, message: 'Signed out successfully!' });
  });

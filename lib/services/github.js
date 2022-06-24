const fetch = require('cross-fetch');

const getTokenUsingGithubCode = async (code) => {
    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { Accept: 'application/json', "Content-Type": 'application/json' },
        body: JSON.stringify({ client_id: process.env.GITHUB_CLIENT_ID, client_secret: process.env.GITHUB_CLIENT_SECRET, code }),
    });

    const resp = await response.json();
    return resp.access_token;
};

const getGithubProfileUsingToken = async (token) => {
    const response = await fetch('https://api.github.com/user', {
        headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json'}
    });

    return response.json();
};

module.exports = { getTokenUsingGithubCode, getGithubProfileUsingToken };
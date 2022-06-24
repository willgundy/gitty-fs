const getTokenUsingGithubCode = async (code) => {
    return `MOCK_TOKEN_FOR_CODE_${code}`;
};

const getGithubProfileUsingToken = async (token) => {
    return {
        login: 'test_user',
        avatar_url: 'https://www.placecage.com/gif/300/300',
        email: 'test@test.com',
    };
};
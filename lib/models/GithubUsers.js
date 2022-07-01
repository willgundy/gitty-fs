const pool = require('../utils/pool');

module.exports = class GithubUser {
  id;
  username;
  email;
  avatar;

  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.avatar = user.avatar;
  }

  static async insert({ username, email, avatar }) {
    if(!username) throw new Error('Username is required!');

    const { rows } = await pool.query(`insert into github_users
                                            (username, email, avatar)
                                            VALUES ($1, $2, $3) returning *`,
    [username, email, avatar]);
    return new GithubUser(rows[0]);
  }

  static async findUserByName(username ) {
    const { rows } = await pool.query('select * from github_users where username = $1', [username]);
    if (!rows[0]) return null;
    return new GithubUser(rows[0]);
  }
};




const pool = require('../utils/pool');

module.exports = class Post {
    id;
    post;

    constructor(post) {
        this.id = post.id;
        this.post = post.post;
    }

    static async getAllPosts() {
        const { rows } = await pool.query(`select * from posts`);
        return  rows.map((row) => new Post(row));
    }

    static async insert({ post }) {
        const { rows } = await pool.query(`insert into posts (post) values ($1)`, [post]);
        return new Post(rows[0]);
    }
}
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
}
const pool = require('../utils/pool');

module.exports = class Post {
    id;
    userId;
    post;

    constructor(post) {
        this.id = post.id;
        this.userId = post.userId;
        this.post = post.post;
    }

    static async getAllPosts() {
        const { rows } = await pool.query('select * from posts');
        return rows.map((row) => new Post(row));
    }
}
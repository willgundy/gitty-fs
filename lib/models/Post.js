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
}
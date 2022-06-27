const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Post = require('../models/Post');


module.exports = Router()
    .get('/', [authenticate], async(req, res, next) => {
        try {
            const postList = await Post.getAllPosts();
            console.log(postList);
            res.json(postList);
        } catch(e) {
            next(e);
        }
    });
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Post = require('../models/Post');


module.exports = Router()
    .post('/', [authenticate, authorize], async(req, res, next) => {
        try {
            const newPost = await Post.insert(req.body);
            res.json(newPost);
        } catch(e) {
            next(e);
        }
    })
    
    .get('/', [authenticate], async(req, res, next) => {
        try {
            const postList = await Post.getAllPosts();
            console.log(postList);
            res.json(postList);
        } catch(e) {
            next(e);
        }
    });
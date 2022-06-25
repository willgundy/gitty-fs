const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
    .get('/', async (req, res) => {
       
    });
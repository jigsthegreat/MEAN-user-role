const express = require('express');

const UserController = require('../controllers/users');

const router = express.Router();

router.post('/signup', UserController.createUser);

router.post('/login', UserController.userLogin);

router.get('', UserController.getUsers);

module.exports = router;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.createUser = (req, res, next) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        // role: req.body.role
        role: "5b348c3d57bb8a1e64df38ad"
        // role: "5b348c2257bb8a1e64df38ab"
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: 'User Created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: 'Invalid authentication credentials!'
          });
        });
    });
  });
};

exports.userLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .select('+password')
    .populate('role')
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }

      // Compare password
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (!isMatch) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }

        const payload = {
          email: user.email,
          id: user._id,
          name: user.name,
          role: user.role.name
        };
        // User Matched
        jwt.sign(
          payload,
          process.env.JWT_KEY,
          { expiresIn: '1h' },
          (err, token) => {
            res.json({
              userId: user._id,
              token: 'Bearer ' + token
            });
          }
        );
      });
    });
};

exports.getUsers = (req, res, next) => {
  User.find()
    .populate('role')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Fetching users failed!'
      });
    });
};

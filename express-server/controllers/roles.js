const Role = require('../models/Role');

exports.getRoles = (req, res, next) => {
  Role.find()
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Fetching roles failed!'
      });
    });
}

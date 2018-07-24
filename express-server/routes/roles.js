const express = require('express');

const RoleController = require('../controllers/roles');

const router = express.Router();

router.get('', RoleController.getRoles);

module.exports = router;

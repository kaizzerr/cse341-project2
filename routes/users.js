const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { userValidation, validate } = require('../validator');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', userValidation(), validate, usersController.createUser);

router.put('/:id', userValidation(), validate, usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;
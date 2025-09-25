const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', tasksController.getAllTasks);

router.get('/:id', tasksController.getSingleTask);

router.post('/', taskValidation(), validate, tasksController.createTask);

router.put('/:id', taskValidation(), validate, tasksController.updateTask);

router.delete('/:id', tasksController.deleteTask);

module.exports = router;
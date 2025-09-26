const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks');
const { taskValidation, validate } = require('../validator');

router.get('/', tasksController.getAll);

router.get('/:id', tasksController.getSingle);

router.post('/', taskValidation(), tasksController.createTask);

router.put('/:id', taskValidation(), tasksController.updateTask);

router.delete('/:id', tasksController.deleteTask);

router.get('/user/:username', tasksController.getTasksByUsername);

module.exports = router;
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Tasks']
    const result = await mongodb.getDatabase().db().collection('tasks').find();
    result.toArray().then((tasks) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tasks);
    });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Tasks']
    const taskId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('tasks').find({ _id: taskId });
    result.toArray().then((tasks) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tasks[0]);
    });
};

const createTask = async (req, res) => {
  //#swagger.tags=['Tasks']
    const task = {
        username: req.body.username,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        urgency: req.body.urgency
      };
      const response = await mongodb.getDatabase().db().collection('tasks').insertOne(task);
      if (response.acknowledged) {
        res.status(204).send();
      } else {
        res.status(500).json(response.err || 'Some error occurred while updating the task');
      }
};

const updateTask = async (req, res) => {
  //#swagger.tags=['Tasks']
    const taskId = new ObjectId(req.params.id);
    const task = {
        username: req.body.username,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        urgency: req.body.urgency
    };
    const response = await mongodb.getDatabase().db().collection('tasks').replaceOne({ _id: taskId }, task);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.err || 'Some error occurred while updating the task');
    }
};

const deleteTask = async (req, res) => {
  //#swagger.tags=['Tasks']
    const taskId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('tasks').deleteOne({ _id: taskId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.err || 'Some error occurred while deleting the task');
    }
};

const getTasksByUsername = async (req, res) => {
  //#swagger.tags=['Tasks']
  const username = req.params.username;

  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('tasks')
      .find({ username });

    const tasks = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks for user', details: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createTask,
  updateTask,
  deleteTask,
  getTasksByUsername
};
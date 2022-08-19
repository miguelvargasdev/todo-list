const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasksController');

router.get('/', taskController.getTasks);
router.post('/createTask', taskController.createTask);
router.put('/toggleComplete', taskController.toggleComplete);
router.delete('/deleteTask', taskController.deleteTask);

module.exports = router;
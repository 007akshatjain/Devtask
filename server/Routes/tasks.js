const express = require('express');
const router = express.Router();
const Task = require('../Models/task');
const auth = require('../Middleware/authMiddleware');

//Get all tasks of logged in user
router.get('/',auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id});
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
})

//Create a new task
router.post('/', auth, async (req, res) => {
    const { title, description, status, board } = req.body;

    try {
        const newTask = new Task({
            title,
            description,
            status,
            board,
            user: req.user.id
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

//Update a task
router.put('/:id', auth, async (req, res) => {
    const { title, description, status, board } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status, board },
            { new: true }
        );

        if (!updatedTask) return res.status(404).json({ msg: "Task not found" });

        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

//Delete a task
router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) return res.status(404).json({ msg: "Task not found" });

        res.json({ msg: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;
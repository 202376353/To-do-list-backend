import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();

// GET /api/todos  → all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

// POST /api/todos → add new
router.post('/', async (req, res) => {
  const { text } = req.body;
  const newTodo = await Todo.create({ text });
  res.status(201).json(newTodo);
});

// PUT /api/todos/:id → toggle complete
router.put('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ msg: 'Todo not found' });
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

// DELETE /api/todos/:id
router.delete('/:id', async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) return res.status(404).json({ msg: 'Todo not found' });
  res.json({ msg: 'Deleted', id: req.params.id });
});

export default router;

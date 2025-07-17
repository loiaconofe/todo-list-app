
import { Router, Request, Response } from 'express';
import { getAllTasks, createTask, updateTask, deleteTask, Task } from '../services/taskService';

const router = Router();

// Get all tasks
router.get('/', (req: Request, res: Response) => {
  res.json(getAllTasks());
});

// Create a new task
router.post('/', (req: Request, res: Response) => {
  const { title, content } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'El título es obligatorio.' });
  }
  const newTask = createTask(title, content);
  res.status(201).json(newTask);
});

// Update a task
router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, content, completed } = req.body;
  if (title !== undefined) {
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'El título es obligatorio.' });
    }
  }
  const updated = updateTask(id, { title, content, completed });
  if (!updated) return res.status(404).json({ error: 'Task not found' });
  res.json(updated);
});

// Delete a task
router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deleted = deleteTask(id);
  if (!deleted) return res.status(404).json({ error: 'Task not found' });
  res.status(204).send();
});

export default router;

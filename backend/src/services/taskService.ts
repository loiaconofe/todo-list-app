export interface Task {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

let tasks: Task[] = [];
let nextId = 1;

export function getAllTasks(): Task[] {
  return tasks;
}

export function createTask(title: string, content: string): Task {
  const newTask: Task = {
    id: nextId++,
    title: title.trim(),
    content,
    completed: false
  };
  tasks.push(newTask);
  return newTask;
}

export function updateTask(id: number, data: Partial<Omit<Task, 'id'>>): Task | null {
  const task = tasks.find(t => t.id === id);
  if (!task) return null;
  if (data.title !== undefined) task.title = data.title.trim();
  if (data.content !== undefined) task.content = data.content;
  if (data.completed !== undefined) task.completed = data.completed;
  return task;
}

export function deleteTask(id: number): boolean {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

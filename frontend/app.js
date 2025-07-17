const addTaskBtn = document.getElementById('add-task-btn');
const taskModal = document.getElementById('task-modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
let editingTaskId = null;
function openModal(editTask = null) {
  taskModal.style.display = 'flex';
  if (editTask) {
    modalTitle.textContent = 'Editar tarea';
    taskInput.value = editTask.title;
    contentInput.value = (typeof editTask.content === 'string') ? editTask.content : '';
    editingTaskId = editTask.id;
  } else {
    modalTitle.textContent = 'Nueva tarea';
    taskInput.value = '';
    contentInput.value = '';
    editingTaskId = null;
    // ...existing code...
  }
}

function closeTaskModal() {
  taskModal.style.display = 'none';
}

function handleTaskForm(e) {
  e.preventDefault();
  const title = taskInput.value.trim();
  const content = contentInput.value.trim();
  if (!title) return;
  if (editingTaskId) {
    updateTask(editingTaskId, { title, content });
    editingTaskId = null;
  } else {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
      .then(() => {
        fetchTasks();
      });
  }
  closeTaskModal();
}
const API_URL = 'http://localhost:3000/api/tasks';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const contentInput = document.getElementById('content-input');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');

let allTasks = [];

function fetchTasks() {
  fetch(API_URL)
    .then(res => res.json())
    .then(tasks => {
      allTasks = tasks;
      renderTasks();
    });
}

function renderTasks() {
  const filter = searchInput.value.toLowerCase();
  taskList.innerHTML = '';
  allTasks
    .filter(task => task.title.toLowerCase().includes(filter) || (task.content && task.content.toLowerCase().includes(filter)))
    .forEach(task => {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';

      const textDiv = document.createElement('div');
      textDiv.className = 'task-text';

      const titleSpan = document.createElement('span');
      titleSpan.textContent = task.title;
      titleSpan.className = 'task-title';
      titleSpan.style.fontWeight = 'bold';
      if (task.completed) titleSpan.style.textDecoration = 'line-through';

      const contentSpan = document.createElement('span');
      contentSpan.textContent = task.content || '';
      contentSpan.className = 'task-content';
      contentSpan.style.fontWeight = 'normal';
      contentSpan.style.fontSize = '0.95em';
      contentSpan.style.color = '#444';
      if (task.completed) contentSpan.style.textDecoration = 'line-through';

      textDiv.appendChild(titleSpan);
      if (task.content) textDiv.appendChild(document.createElement('br'));
      if (task.content) textDiv.appendChild(contentSpan);

      const actions = document.createElement('div');
      actions.className = 'actions';
      const toggleBtn = document.createElement('button');
      toggleBtn.innerHTML = task.completed ? '&#8634;' : '&#10003;'; // ↴ para pendiente, ✓ para completar
      toggleBtn.title = task.completed ? 'Marcar como pendiente' : 'Marcar como completada';
      toggleBtn.onclick = () => updateTask(task.id, { completed: !task.completed });

      const editBtn = document.createElement('button');
      editBtn.innerHTML = '&#9998;'; // ✎
      editBtn.title = 'Editar tarea';
      editBtn.onclick = () => openModal(task);

      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '&#128465;'; // 🗑
      deleteBtn.title = 'Eliminar tarea';
      deleteBtn.onclick = () => deleteTask(task.id);

      actions.appendChild(toggleBtn);
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);
      li.appendChild(textDiv);
      li.appendChild(actions);
      taskList.appendChild(li);
    });
}

function addTask(e) {
  e.preventDefault();
  const title = taskInput.value.trim();
  const content = contentInput.value.trim();
  if (!title) return;
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  })
    .then(() => {
      taskInput.value = '';
      contentInput.value = '';
      fetchTasks();
    });
}

function updateTask(id, data) {
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(() => fetchTasks());
}

function deleteTask(id) {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE' })
    .then(() => fetchTasks());
}

addTaskBtn.addEventListener('click', () => openModal());
closeModal.addEventListener('click', closeTaskModal);
taskForm.addEventListener('submit', handleTaskForm);
searchInput.addEventListener('input', renderTasks);
window.addEventListener('click', (e) => {
  if (e.target === taskModal) closeTaskModal();
});
fetchTasks();

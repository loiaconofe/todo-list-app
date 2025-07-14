# ToDoListIA

Aplicación de lista de tareas con frontend y backend.

## Estructura del proyecto

- `frontend/`: Contiene la interfaz web (HTML, CSS, JS).
- `backend/`: Servidor Node.js para la API de tareas.

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/loiaconofe/todo-list-app.git
   ```
2. Instala dependencias en el backend:
   ```sh
   cd todolistia/backend
   npm install
   ```

## Uso

1. Inicia el backend:
   ```sh
   node server.js
   ```
2. Abre `frontend/index.html` en tu navegador.

## Funcionalidades

- Crear, editar y eliminar tareas.
- Marcar tareas como completadas o pendientes.
- Búsqueda de tareas por título o contenido.

## Configuración

- El backend corre por defecto en `http://localhost:3000`.
- Puedes modificar la URL en `frontend/app.js` si cambias el puerto.

## Requisitos

- Node.js
- Navegador web moderno

## Desarrollo asistido con GitHub Copilot

Este proyecto fue creado y mejorado utilizando GitHub Copilot como asistente de programación. A continuación se describe cómo Copilot ayudó en distintas etapas:

### Proceso de creación

- **Estructura inicial:** Copilot sugirió la estructura de carpetas `frontend/` y `backend/`, facilitando la organización del código.
- **Frontend:** Se generaron componentes de la interfaz, como el modal para crear/editar tareas, el formulario y la lógica para mostrar y filtrar tareas. Por ejemplo, Copilot propuso el uso de `addEventListener` y la función `renderTasks` para actualizar la lista en tiempo real.
- **Backend:** Copilot ayudó a definir rutas REST para la API de tareas en Node.js, incluyendo los métodos para crear, editar, eliminar y listar tareas.
- **Corrección de errores:** Durante el desarrollo, Copilot detectó y sugirió soluciones para problemas como IDs duplicados en el HTML y la lógica de edición de tareas.
- **Mejoras visuales:** Copilot propuso estilos para diferenciar el título y el contenido de cada tarea, haciendo la interfaz más clara y moderna.
- **Automatización de archivos:** Copilot generó automáticamente archivos como `.gitignore` y este `README.md`, adaptando el contenido según las necesidades del proyecto.

### Ejemplos específicos

- Cuando el botón de "nueva tarea" no funcionaba, Copilot identificó el conflicto de IDs y propuso la corrección.
- Para la edición de tareas, Copilot simplificó la lógica para que el contenido se guarde correctamente, incluso si el usuario lo borra.
- En la sección de instalación, Copilot reemplazó automáticamente la URL del repositorio por la real.

Gracias a Copilot, el desarrollo fue más ágil, con sugerencias precisas y automatización de tareas repetitivas.

## Licencia

MIT

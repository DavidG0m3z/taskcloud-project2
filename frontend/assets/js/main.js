/**
 * TaskCloud Frontend - Aplicación de gestión de tareas
 * Proyecto Cloud Computing - UDEA 2025
 */

// Configuración de la API
const API_BASE_URL = 'https://hoswnx8mtc.execute-api.us-east-1.amazonaws.com/prod'\;
const API_ENDPOINTS = {
    getTasks: `${API_BASE_URL}/tasks`,
    createTask: `${API_BASE_URL}/tasks`,
    deleteTask: (taskId) => `${API_BASE_URL}/tasks/${taskId}`
};

// Estado de la aplicación
let tasks = [];
let isLoading = false;

/**
 * Inicialización de la aplicación
 */
window.onload = function() {
    console.log('TaskCloud iniciado');
    loadTasks();
};

/**
 * Obtiene todas las tareas desde la API
 */
async function loadTasks() {
    const taskList = document.getElementById('taskList');
    
    try {
        isLoading = true;
        taskList.innerHTML = '<li class="loading">Cargando tareas...</li>';
        
        const response = await fetch(API_ENDPOINTS.getTasks, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Respuesta de la API:', result);
        
        tasks = result.data.tasks || [];
        displayTasks(tasks);
        
    } catch (error) {
        console.error('Error al cargar tareas:', error);
        taskList.innerHTML = '<li class="empty-state">Error al cargar tareas. Intenta nuevamente.</li>';
        showStatus('Error al cargar tareas: ' + error.message, 'error');
    } finally {
        isLoading = false;
    }
}

/**
 * Muestra las tareas en el DOM
 * @param {Array} tasksArray - Array de tareas a mostrar
 */
function displayTasks(tasksArray) {
    const taskList = document.getElementById('taskList');
    
    if (!tasksArray || tasksArray.length === 0) {
        taskList.innerHTML = '<li class="empty-state">No hay tareas. Agrega tu primera tarea!</li>';
        return;
    }
    
    taskList.innerHTML = tasksArray.map(task => `
        <li class="task-item" data-task-id="${task.taskId}">
            <span class="task-text">${escapeHtml(task.taskText)}</span>
            <span class="task-date">${formatDate(task.createdAt)}</span>
            <button class="delete-btn" onclick="deleteTask('${task.taskId}')">Eliminar</button>
        </li>
    `).join('');
}

/**
 * Crea una nueva tarea
 */
async function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (!taskText) {
        showStatus('Por favor escribe una tarea', 'error');
        input.focus();
        return;
    }
    
    if (taskText.length > 500) {
        showStatus('La tarea no puede exceder 500 caracteres', 'error');
        return;
    }
    
    try {
        showStatus('Creando tarea...', 'success');
        
        const response = await fetch(API_ENDPOINTS.createTask, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskText: taskText
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Error al crear tarea');
        }
        
        const result = await response.json();
        console.log('Tarea creada:', result);
        
        // Limpiar input
        input.value = '';
        
        // Recargar tareas
        await loadTasks();
        
        showStatus('Tarea creada exitosamente', 'success');
        
    } catch (error) {
        console.error('Error al crear tarea:', error);
        showStatus('Error al crear tarea: ' + error.message, 'error');
    }
}

/**
 * Elimina una tarea
 * @param {string} taskId - ID de la tarea a eliminar
 */
async function deleteTask(taskId) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        return;
    }
    
    try {
        showStatus('Eliminando tarea...', 'success');
        
        const response = await fetch(API_ENDPOINTS.deleteTask(taskId), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Error al eliminar tarea');
        }
        
        const result = await response.json();
        console.log('Tarea eliminada:', result);
        
        // Recargar tareas
        await loadTasks();
        
        showStatus('Tarea eliminada exitosamente', 'success');
        
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        showStatus('Error al eliminar tarea: ' + error.message, 'error');
    }
}

/**
 * Muestra un mensaje de estado temporal
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de mensaje (success/error)
 */
function showStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${type}`;
    
    setTimeout(() => {
        status.textContent = '';
        status.className = 'status';
    }, 4000);
}

/**
 * Formatea una fecha ISO a formato legible
 * @param {string} isoDate - Fecha en formato ISO
 * @returns {string} Fecha formateada
 */
function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('es-CO', options);
}

/**
 * Escapa caracteres HTML para prevenir XSS
 * @param {string} text - Texto a escapar
 * @returns {string} Texto escapado
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Manejo de errores globales
window.addEventListener('error', (event) => {
    console.error('Error global:', event.error);
});

// Log cuando la página está completamente cargada
window.addEventListener('load', () => {
    console.log('TaskCloud frontend cargado completamente');
});

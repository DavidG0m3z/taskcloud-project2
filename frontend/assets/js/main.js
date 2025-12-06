// API Gateway URL - La vamos a configurar después
const API_URL = 'PENDIENTE_API_GATEWAY_URL';

// Cargar tareas al iniciar
window.onload = function() {
    loadTasks();
};

async function loadTasks() {
    const taskList = document.getElementById('taskList');
    
    // Por ahora usamos datos de ejemplo (luego conectaremos con la API)
    const exampleTasks = [
        {
            taskId: '1',
            taskText: 'Configurar VPC y Subnet',
            createdAt: new Date().toISOString()
        },
        {
            taskId: '2',
            taskText: 'Crear bucket S3 para frontend',
            createdAt: new Date().toISOString()
        },
        {
            taskId: '3',
            taskText: 'Configurar DynamoDB',
            createdAt: new Date().toISOString()
        }
    ];
    
    displayTasks(exampleTasks);
}

function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-state">No hay tareas. ¡Agrega una!</li>';
        return;
    }
    
    taskList.innerHTML = tasks.map(task => `
        <li class="task-item">
            <span class="task-text">${task.taskText}</span>
            <span class="task-date">${new Date(task.createdAt).toLocaleDateString('es-CO')}</span>
            <button class="delete-btn" onclick="deleteTask('${task.taskId}')">🗑️</button>
        </li>
    `).join('');
}

async function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (!taskText) {
        showStatus('Por favor escribe una tarea', 'error');
        return;
    }
    
    // Por ahora solo agregamos localmente
    showStatus('Tarea agregada (modo demo)', 'success');
    input.value = '';
    
    // Aquí conectaremos con la API Lambda después
}

async function deleteTask(taskId) {
    showStatus('Tarea eliminada (modo demo)', 'success');
    // Aquí conectaremos con la API Lambda después
}

function showStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${type}`;
    
    setTimeout(() => {
        status.textContent = '';
        status.className = 'status';
    }, 3000);
}
EOF
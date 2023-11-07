document.addEventListener('DOMContentLoaded', () => {
    // Cargar tareas si el usuario ya está registrado e inició sesión
    if(localStorage.getItem('isLoggedIn') === 'true'){
        loadTasks();
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('todo-container').style.display = 'block';
    }
});

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    // Aquí deberías incluir la lógica para comprobar si el usuario ya existe
    localStorage.setItem(username, password);
    alert('Usuario registrado con éxito');
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    if(localStorage.getItem(username) === password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
        loadTasks();
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('todo-container').style.display = 'block';
    } else {
        alert('Nombre de usuario o contraseña incorrectos');
    }
}

function addTask() {
    const newTaskInput = document.getElementById('new-task-input');
    const tasksList = document.getElementById('tasks-list');
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        const taskEl = document.createElement('li');
        taskEl.textContent = taskText;
        tasksList.appendChild(taskEl);
        newTaskInput.value = '';
        newTaskInput.focus();
        // Guardar tareas en el almacenamiento local
        saveTasks();
    }
}

function saveTasks() {
    const tasksList = document.getElementById('tasks-list');
    const tasks = [];
    for (const li of tasksList.children) {
        tasks.push(li.textContent);
    }
    const currentUser = localStorage.getItem('currentUser');
    localStorage.setItem(currentUser + '_tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const currentUser = localStorage.getItem('currentUser');
    const tasks = JSON.parse(localStorage.getItem(currentUser + '_tasks')) || [];
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = '';
    tasks.forEach(taskText => {
        const taskEl = document.createElement('li');
        taskEl.textContent = taskText;
        tasksList.appendChild(taskEl);
    });
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('todo-container').style.display = 'none';
    // Limpiar la lista de tareas en la interfaz
    document.getElementById('tasks-list').innerHTML = '';
}

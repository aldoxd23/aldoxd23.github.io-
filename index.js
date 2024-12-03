document.getElementById('tarea-form').addEventListener('submit', function(event) {
    event.preventDefault();  
    const taskInput = document.getElementById('tarea-input');
    const taskText = taskInput.value.trim(); 

    if (taskText) {
        const taskList = document.getElementById('tarea-list');
        const listItem = document.createElement('li');

        // Crear el texto de la tarea
        const taskTextNode = document.createElement('span');
        taskTextNode.textContent = taskText;
        listItem.appendChild(taskTextNode);

        // Obtener la fecha actual
        const dateNode = document.createElement('span');
        const currentDate = new Date().toLocaleString(); // Formato de fecha y hora
        dateNode.textContent = currentDate;
        dateNode.style.fontSize = '12px'; // Tamaño de fuente más pequeño
        dateNode.style.color = '#777'; // Color gris para la fecha
        dateNode.style.marginLeft = '10px'; // Espaciado
        listItem.appendChild(dateNode);

        // Botón de Editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = function() {
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = taskTextNode.textContent;

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Guardar';
            saveButton.onclick = function() {
                const newTaskText = inputField.value.trim();
                if (newTaskText) {
                    taskTextNode.textContent = newTaskText;
                    updateLocalStorage();
                } else {
                    alert("Por favor, ingresa un texto válido.");
                }
                listItem.removeChild(inputField);
                listItem.removeChild(saveButton);
                listItem.appendChild(editButton); // Reagregar el botón de editar
            };

            listItem.removeChild(editButton); // Eliminar el botón de editar
            listItem.appendChild(inputField);
            listItem.appendChild(saveButton);
        };

        // Botón de Eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function() {
            taskList.removeChild(listItem);
            updateLocalStorage();
        };

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);

        taskInput.value = ''; 

        updateLocalStorage(); // Actualizar localStorage después de agregar la tarea
    } else {
        alert("Por favor, ingresa una tarea válida."); 
    }
});

function updateLocalStorage() {
    const taskList = document.getElementById('tarea-list');
    const tasks = [];
    const items = taskList.getElementsByTagName('li');

    for (let item of items) {
        const taskText = item.querySelector('span').textContent;
        const taskDate = item.querySelectorAll('span')[1].textContent;
        tasks.push({ text: taskText, date: taskDate });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks)); // Guardar tareas en localStorage
}

// Cargar tareas desde localStorage cuando se carga la página
window.addEventListener('load', function() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('tarea-list');

    storedTasks.forEach(task => {
        const listItem = document.createElement('li');

        // Crear el texto de la tarea
        const taskTextNode = document.createElement('span');
        taskTextNode.textContent = task.text;
        listItem.appendChild(taskTextNode);

        // Crear la fecha
        const dateNode = document.createElement('span');
        dateNode.textContent = task.date;
        dateNode.style.fontSize = '12px';
        dateNode.style.color = '#777';
        dateNode.style.marginLeft = '10px';
        listItem.appendChild(dateNode);

        // Botón de Editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = function() {
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = taskTextNode.textContent;

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Guardar';
            saveButton.onclick = function() {
                const newTaskText = inputField.value.trim();
                if (newTaskText) {
                    taskTextNode.textContent = newTaskText;
                    updateLocalStorage();
                } else {
                    alert("Por favor, ingresa un texto válido.");
                }
                listItem.removeChild(inputField);
                listItem.removeChild(saveButton);
                listItem.appendChild(editButton); // Reagregar el botón de editar
            };

            listItem.removeChild(editButton);
            listItem.appendChild(inputField);
            listItem.appendChild(saveButton);
        };

        // Botón de Eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function() {
            taskList.removeChild(listItem);
            updateLocalStorage();
        };

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
});

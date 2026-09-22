const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        const li = document.createElement("li");
        li.className = "task";

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        span.onclick = function () {
            toggleTask(task.id);
        };

        const actions = document.createElement("div");
        actions.className = "actions";

        // Complete button
        const completeButton = document.createElement("button");
        completeButton.className = "complete-btn";
        completeButton.textContent = "✓";

        completeButton.onclick = function () {
            toggleTask(task.id);
        };

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "🗑️";

        deleteButton.onclick = function () {
            deleteTask(task.id);
        };

        actions.appendChild(completeButton);
        actions.appendChild(deleteButton);

        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    updateTaskCount();
}

function toggleTask(id) {
    tasks = tasks.map(function (task) {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    saveTasks();
    displayTasks();
}

function clearAll() {

    if (tasks.length === 0) {
        return;
    }

    const confirmDelete = confirm(
        "Are you sure you want to delete all tasks?"
    );

    if (confirmDelete) {
        tasks = [];

        saveTasks();
        displayTasks();
    }
}

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function updateTaskCount() {

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        function (task) {
            return task.completed;
        }
    ).length;

    taskCount.textContent =
        `${totalTasks} Tasks | ${completedTasks} Completed`;
}

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});
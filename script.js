let tasks = [];

//implementing local storage
const saveTasks = () => {
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
document.addEventListener("DOMContentLoaded",() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));
        updateTasksList();
        updateStats();
    }
});

//adding tasks to task list and updating list, updating stats, saving tasks
document.getElementById("newTask").addEventListener("click",(event) => {
    event.preventDefault();
    addtask();
});

function addtask() {
    const taskInput = document.getElementById("taskInput");
    let text = taskInput.value.trim();
    if(text) {
        tasks.push({text:text,completed:false});
        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTasks();
    }
}
//updating task list
const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';
    tasks.forEach((task,index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed?'completed':''}">
                <input type="checkbox" class="checkbox" ${task.completed?"checked":""}>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="edit.jpg" alt="" onclick="editTask(${index})">
                <img src="bin.png" alt="" onclick="deleteTask(${index})">
            </div>
        </div>
        `;
        listItem.addEventListener("change",() => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();
    
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();
};
//updating progress bar and stat numbers
const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;

    const numbers = document.getElementById('numbers');
    numbers.textContent = `${completedTasks}/${totalTasks}`;
    
    const progressBar = document.getElementById('progress');
    const progress = (tasks.length === 0)?0:(completedTasks / totalTasks)*100;
    progressBar.style.width = `${progress}%`;

    if(tasks.length && completedTasks === totalTasks) {
        blastconfetti();
    }
    
};

const blastconfetti = () => {
    const count = 200,
    defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        })
    );
    }

    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });

    fire(0.2, {
    spread: 60,
    });

    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });
};
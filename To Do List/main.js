const input = document.getElementsByTagName('input')[0];
const add = document.getElementById('add');

const sortButtons = document.getElementsByClassName('header')[0];
const alphabatecalSort = document.getElementById('sorted');
const originalSort = document.getElementById('original');

const tasks = [];
const taskList = document.getElementsByClassName('taskList')[0];
const taskBluePrint = `<p></p><button class="deleteTask fa-solid fa-trash"></button>`;

add.addEventListener('click', _ => {
    const userInput = input.value.trim();
    input.value = '';

    if (userInput.length > 0 && !(tasks.includes(userInput))) {
        tasks.push(userInput);

        const task = document.createElement('div');
        task.classList.add('task');
        task.innerHTML = taskBluePrint;
        task.firstElementChild.textContent = userInput;

        task.addEventListener('click', e => {
            if (e.target.classList.contains("deleteTask")) {

                if (tasks.length >= 1) {
                    const idx = tasks.indexOf(e.currentTarget.firstElementChild.textContent);
                    tasks.splice(idx, 1);
                }

                e.currentTarget.remove();

                if (tasks.length <= 1) {
                    sortButtons.style.display = 'none';
                }
            }
        });

        taskList.appendChild(task);

        if (tasks.length >= 2) {
            sortButtons.style.display = 'flex';
        }
    } else {
        alert('your task is either empty or repeatd');
    }
});

let sortedTasks;
alphabatecalSort.addEventListener('click', _ => {
    sortedTasks = [...tasks].sort();
    for (let i = 0; i < taskList.children.length; i++) {
        taskList.children[i].firstElementChild.textContent = sortedTasks[i];
    }
});

originalSort.addEventListener('click', _ => {
    for (let i = 0; i < taskList.children.length; i++) {
        taskList.children[i].firstElementChild.textContent = tasks[i];
    }
});
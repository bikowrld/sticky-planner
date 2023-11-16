let todoList = [];
let deletedTodoList = [];
const inputElem = document.getElementById('tasks');
const taskBasket = document.getElementById('task-lists');
const tasks = JSON.parse(localStorage.getItem('todoList'));
const deletedTask = JSON.parse(localStorage.getItem('deletedTodoList'));

if(tasks){
    todoList = tasks;
};

function displayTask() {
let todoListHTML = '';
for (let i = 0; i < todoList.length; i++) {
    const taskList = todoList[i];
    const taskName = taskList.taskName;
    const dueDate = taskList.dueDate;
    const html = `<div class='task-item'>
        <div>${taskName}</div>
        <div class = 'time-date'>
        <div>${dueDate}</div>
        </div>
        <div id='btn-div'>
        <button class='completed-btn' data-index='${i}'>Done</button>
        <button class='delete-btn' data-index='${i}'>Delete</button>
        </div>
        </div>`;
    todoListHTML += html;
}
taskBasket.innerHTML = todoListHTML;

const completedButtons = document.querySelectorAll('.completed-btn');
const deleteButtons = document.querySelectorAll('.delete-btn');

completedButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        markAsCompleted(index);
    });
});

deleteButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        itemDelete(index);
    });
});
};

function addTasks() {
const taskName = inputElem.value;
let now = new Date();
let date = now.toLocaleDateString();
let time = now.toLocaleTimeString();
const dueDate = date + ' ' + time;

if(taskName !== null && taskName !== '' && taskName !== undefined &&
dueDate !== null && dueDate !== '' && dueDate !== undefined){
    todoList.push({ taskName, dueDate });
    inputElem.value = '';
    localStorage.setItem('todoList', JSON.stringify(todoList));

    displayTask();
    }else{
        errorMessage();
    }
};

function errorMessage(){
    if(!inputElem.value){
    inputElem.value = "Please provide a valid input"
    }
};

inputElem.addEventListener('focus', function(){
    inputElem.value = '';
});

function markAsCompleted(index) {
    if (index >= 0 && index < todoList.length) {
        const taskItem = document.querySelectorAll('.task-item')[index];
        taskItem.innerHTML = `<p>Task Completed</p>`;
        deletedTodoList.push(
            {taskName: todoList[index].taskName,
            dueDate: todoList[index].dueDate});

        setTimeout(function(){
            itemDelete(index);
        },3000);
        localStorage.setItem('todoList', JSON.stringify(todoList)); 
    }
};

function itemDelete(index) {
if (index >= 0 && index < todoList.length) {
    todoList.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    
    displayTask(); 
}
};

const doneTasks = document.querySelector('#previous-tasks');
let isPopupVisible = false;
doneTasks.addEventListener('click', function(){
    const popup = document.querySelector('.pop-up');    

    let previousItemsList = [];
    if (deletedTodoList && deletedTodoList.length > 0) {
        deletedTodoList.forEach(task => {
            previousItemsList.push(`
            <div class='pop-up-2'>
                <div class='completed-task'>
                    <div>Task: ${task.taskName}</div>
                    <div>Date: ${task.dueDate}</div>
                </div>
            </div>`);
        })
        localStorage.setItem('previousItemsList', JSON.stringify(deletedTodoList));
    };
    popup.innerHTML = previousItemsList.join('');
    console.log(previousItemsList) 

    isPopupVisible = !isPopupVisible;
    popup.style.display = isPopupVisible ? 'flex' : 'none';
});

displayTask();

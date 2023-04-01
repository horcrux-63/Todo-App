"use strict";
let form = document.querySelector('#new-task-form');
let newTask = document.querySelector('#new-task-input');
let List = document.querySelector('#tasks');
let todoList = LoadTask();
let removeThisTask = (dlt) => {
    todoList = todoList.filter(item => item.id != dlt);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    addEverything();
};

let onClickEdit = (edit_btn, input_el, task) => {
    console.log(edit_btn);
    if (edit_btn.innerText == 'Edit') {
        edit_btn.innerText = 'Update';
        input_el.removeAttribute("readonly");
    }
    else {
        input_el.setAttribute("readonly", "readonlye");
        task.task = input_el.value;
        localStorage.setItem('todoList', JSON.stringify(todoList));
        edit_btn.innerText = 'Edit';
    }
};
function createTask(task) {
    let divEl = document.createElement('div');
    divEl.classList.add("Task2");
    const input_el = document.createElement("input");
    input_el.classList.add("text");
    input_el.type = "text";
    input_el.value = task.task;
    input_el.setAttribute("readonly", "readonly");
    divEl.appendChild(input_el);
    let edit_btn = document.createElement('button');
    edit_btn.classList.add("edit");
    edit_btn.innerText = "Edit";
    edit_btn.addEventListener('click', () => {
        onClickEdit(edit_btn, input_el, task);
    });
    let delete_btn = document.createElement('button');
    delete_btn.classList.add("delete");
    delete_btn.innerText = "Delete";
    delete_btn.addEventListener('click', () => {
        removeThisTask(task.id);
    });
    divEl.appendChild(edit_btn);
    divEl.appendChild(delete_btn);
    return divEl;
}
;
function addTask(e) {
    e.preventDefault();
    if ((newTask === null || newTask === void 0 ? void 0 : newTask.value) == null || (newTask === null || newTask === void 0 ? void 0 : newTask.value) == "") {
        alert("Please fill out the task");
        return;
    }
    let task1 = newTask.value;
    const localTodo = {
        id: Date.now(),
        task: task1,
        status: false
    };
    todoList.push(localTodo);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    newTask.value = "";
    addEverything();
}
;
let addEverything = function () {
    // (List === null || List === void 0 ? void 0 : List.innerHTML) ?   
    todoList.forEach(elem => {
        let listItem;
        listItem = createTask(elem);
        List === null || List === void 0 ? void 0 : List.appendChild(listItem);
    });
};
function LoadTask() {
    const TaskJSON = localStorage.getItem('todoList');
    if (TaskJSON == null)
        return [];
    return JSON.parse(TaskJSON);
}
form === null || form === void 0 ? void 0 : form.addEventListener('submit', addTask);

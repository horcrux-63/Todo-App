
let form = document.querySelector('#new-task-form');
let newTask = form['new-task-input'];
let List = document.querySelector('#tasks');
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

let removeThisTask = (dlt) => {
    todoList = todoList.filter(item => item.id != dlt);

    localStorage.setItem('todoList', JSON.stringify(todoList));
    add1();
};

let onClickEdit = (edit_btn, input_el, task) => {
    console.log(edit_btn);
    if(edit_btn.innerText == 'Edit'){
        edit_btn.innerText = 'Update';
        input_el.removeAttribute("readonly");

    }else{
        input_el.setAttribute("readonly", "readonlye");
        task.task = input_el.value;
        localStorage.setItem('todoList', JSON.stringify(todoList));

        edit_btn.innerText = 'Edit';
    }
};

createTask = (task) => {
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
    })

    let delete_btn = document.createElement('button');
    delete_btn.classList.add("delete");
    delete_btn.innerText = "Delete";

    delete_btn.addEventListener('click', () => {
        removeThisTask(task.id);
    })

    divEl.appendChild(edit_btn);
    divEl.appendChild(delete_btn);

    return divEl;
};

addTask = (e) => {
    e.preventDefault();
    let task1 = newTask.value;
    if(!task1){
        alert("Please fill out the task");
        return;
    }
    const localTodo = {
        id : Date.now(),
        task : task1,
        status : false
    };

    todoList.push(localTodo);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    newTask.value = "";
    add1();

};

let add1 = function () {
    List.innerHTML = null;
    todoList.forEach(elem => {
        let listItem = createTask(elem);
        List.appendChild(listItem);
    });
};


let edit_btn = document.querySelectorAll('edit');
console.log(edit_btn);

console.log(edit_btn);
form.addEventListener('submit', addTask);

add1();


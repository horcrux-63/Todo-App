let form = document.querySelector('#new-task-form');
let newTask = form['new-task-input'];
let List = document.querySelector('#tasks');
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    let id = Date.now();
    const todo = new Todo(id, newTask.value);

    if(!todo._todo){
        alert("Please fill out the task");
        return;
    }

    let newTodo = TodoManagement.createTask(todo._todo);

    TodoManagement.AddToLocal(todo._todo);
    TodoManagement.DisplayData();
    TodoManagement.clearInput();
});

class Todo {
    constructor(id, _todo){
        this.id = id;
        this._todo = _todo;
    }
}

class ManageButtons {
    static removeThisTask (dlt) {
        todoList = todoList.filter(item => item.id != dlt);

        localStorage.setItem('todoList', JSON.stringify(todoList));
        TodoManagement.DisplayData();
    };

    static editThisTask (edit_btn, input_el, task) {
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
}

class TodoManagement {
    static createTask (task) {
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
    
    
        let delete_btn = document.createElement('button');
        delete_btn.classList.add("delete");
        delete_btn.innerText = "Delete";
    
        divEl.appendChild(edit_btn);
        divEl.appendChild(delete_btn);

        edit_btn.addEventListener('click', () => {
            ManageButtons.editThisTask(edit_btn, input_el, task);
        })

        delete_btn.addEventListener('click', () => {
            ManageButtons.removeThisTask(task.id);
        })
    
        return divEl;
    };

    static AddToLocal(task){
        const localTodo = {
            id : Date.now(),
            task : task,
            status : false
        };
    
        todoList.push(localTodo);
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }

    static DisplayData(task){
        List.innerHTML = null;
        todoList.forEach(elem => {
            let listItem = this.createTask(elem);
            List.appendChild(listItem);
        });
    }

    static clearInput(){
        newTask.value = "";
    }


}

TodoManagement.DisplayData();
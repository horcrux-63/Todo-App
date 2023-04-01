
// type TaskInput = {
//     id : number
//     task : string
//     status : boolean
// }

interface Mytodo {
    id: number;
    _todo: string;
    status?: boolean;
}

let form = document.querySelector<HTMLFormElement>('#new-task-form');
let newTask = document.querySelector<HTMLInputElement>('#new-task-input');
let List = document.querySelector<HTMLDivElement>('#tasks');

form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = Date.now();
    if (newTask?.value == null || newTask?.value == "") {
        alert("Please fill out the task");
        return;
    }
    const todo = new Todo(id, newTask.value);

    let newTodo = TodoManagement.createTask(todo);

    TodoManagement.AddToLocal(todo);
    TodoManagement.DisplayData();
    newTask.value = "";
});

class Todo implements Mytodo {
    id: number;
    _todo: string;

    constructor(id: number, _todo: string) {
        this.id = id;
        this._todo = _todo;
    }
}

class ManageButtons {
    static removeThisTask(dlt: number) {
        todoList = todoList.filter(item => item.id != dlt);

        localStorage.setItem('todoList', JSON.stringify(todoList));
        TodoManagement.DisplayData();
    };

    static editThisTask(edit_btn: HTMLButtonElement,
        input_el: HTMLInputElement,
        task: Mytodo
    ) {
        console.log(edit_btn);
        if (edit_btn.innerText == 'Edit') {
            edit_btn.innerText = 'Update';
            input_el.removeAttribute("readonly");

        } else {
            input_el.setAttribute("readonly", "readonlye");
            task._todo = input_el.value;
            localStorage.setItem('todoList', JSON.stringify(todoList));

            edit_btn.innerText = 'Edit';
        }
    };
}

class TodoManagement {
    static createTask(task: Mytodo) {
        let divEl = document.createElement('div');
        divEl.classList.add("Task2");

        const input_el = document.createElement("input");
        input_el.classList.add("text");
        input_el.type = "text";
        input_el.value = task._todo;
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

    static AddToLocal(task: Mytodo) {
        const localTodo: Mytodo = {
            id: Date.now(),
            _todo: task._todo,
            status: false
        };

        todoList.push(localTodo);
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }

    static DisplayData() {
        if (List != null) List.innerHTML = "";
        todoList.forEach(elem => {
            let listItem: HTMLDivElement
            listItem = this.createTask(elem);
            List?.appendChild(listItem);
        });
    }

    static LoadTask() {
        const TaskJSON = localStorage.getItem('todoList');
        if (TaskJSON == null) return [];
        return JSON.parse(TaskJSON);
    }
}
let todoList: Mytodo[] = TodoManagement.LoadTask();
TodoManagement.DisplayData();
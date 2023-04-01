

type TaskInput = {
  id : number
  task : string
  status : boolean
}

let form = document.querySelector<HTMLFormElement>('#new-task-form');
let newTask = document.querySelector<HTMLInputElement>('#new-task-input');
let List = document.querySelector<HTMLDivElement>('#tasks');
let todoList : TaskInput[] = LoadTask();

console.log(10);

let removeThisTask = (dlt : number) => {
  todoList = todoList.filter(item => item.id  != dlt);

  localStorage.setItem('todoList', JSON.stringify(todoList));
  addEverything();
};

let onClickEdit = (edit_btn : HTMLButtonElement, input_el : HTMLInputElement, task : TaskInput) => {
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


function createTask (task : TaskInput) : HTMLDivElement {
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

function addTask (e : any) : void {
    e.preventDefault();
    if(newTask?.value == null || newTask?.value == ""){
        alert("Please fill out the task");
        return;
    }
    let task1 = newTask.value;
    const localTodo : TaskInput = {
        id : Date.now(),
        task : task1,
        status : false
    };

    todoList.push(localTodo);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    newTask.value = "";
    addEverything();

};

let addEverything = function () {
  if(List != null) List.innerHTML = "";
  todoList.forEach(elem => {
      let listItem : HTMLDivElement
      listItem = createTask(elem);
      List?.appendChild(listItem);
  });
};

function LoadTask(){
  const TaskJSON = localStorage.getItem('todoList');
  if(TaskJSON == null) return [];
  return JSON.parse(TaskJSON);
}

form?.addEventListener('submit', addTask);
addEverything();
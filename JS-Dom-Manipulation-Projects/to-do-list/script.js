const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

let tasks = [];

function saveTask(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getAllTask(){
    let alltasks = JSON.parse(localStorage.getItem("tasks")) || [];
    alltasks.forEach(element => {
        content = element.content;
        addNewTask(content,element.completed);
    });
}
function addNewTask(inputText,status) {
    if (inputText.length !== 0) {
      const newTask = {
        id :Date.now() + Math.floor(Math.random() * 1_000_000_000) + 1,
        content: inputText,
        completed: status,
      };
      
      todoInput.value = "";
      tasks.push(newTask);
      saveTask();
      const li = document.createElement("li");
      li.innerHTML = `<span>${inputText}</span>
        <button>Delete</button>
        `;
        if (newTask.completed)li.classList.add('completed');
        todoList.appendChild(li);

      li.addEventListener("click", (event) => {
        if (event.target.tagName.toLowerCase() === "button") {
          tasks = tasks.filter(val=> val.id!==newTask.id);
          li.remove();
        } else {
          li.classList.toggle("completed");
          const index = tasks.findIndex((item) => item.id === newTask.id);
          tasks[index].completed = !tasks[index].completed;
        }
        saveTask();
      });
    }
}

addButton.addEventListener('click',()=>{
    const inputText = todoInput.value.trim();
    addNewTask(inputText,false);
})

getAllTask();
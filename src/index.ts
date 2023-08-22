import {v4 as uuidV4} from "uuid"

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-text-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-text-title");

const tasks : Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault()

  if(input?.value == null || input.value == "") return

  const newTask : Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  tasks.push(newTask)

  addListItem(newTask);
  input.value = ''
})

function addListItem(task : Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkBox = document.createElement("input");
  checkBox.addEventListener("change", ()=>{
    task.completed = checkBox.checked;
    saveTasks()
  })
  checkBox.type = "checkbox";
  checkBox.checked = task.completed;
  label.append(checkBox, task.title);
  item.append(label);
  list?.append(item);
  saveTasks()
}

function saveTasks() {
  localStorage.setItem("Tasks", JSON.stringify(tasks));
}

function loadTasks() : Task[] {
  const tasksJSON = localStorage.getItem("Tasks")
  if (tasksJSON === null) return []
  return JSON.parse(tasksJSON)
}
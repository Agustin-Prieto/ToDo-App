document.getElementById("form").addEventListener("submit", saveTask);

function saveTask(e) {
  let title = document.getElementById("title");
  let desc = document.getElementById("description");

  e.preventDefault();
  let task = {
    title: title.value,
    desc: desc.value
  };

  if(localStorage.getItem('tasks') !== null){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
  } else {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }

  showTasks();

  form.reset();
}

function showTasks(){
  let taskCont = document.getElementById('taskContainer');
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  
  taskCont.innerHTML = '';

  if(localStorage.getItem('tasks') === null){
    taskCont.innerHTML = `<div class="alert aler-primary">There are no task yet</div>`;
  } else {
    for(let i = 0; i < tasks.length; i++){
      taskCont.innerHTML += `
      <div class="card mt-3">
        <div class="card-body">
          <h2 class="card-title">${tasks[i].title}</h2>
          <p class="card-text">${tasks[i].desc}</p>
          <button class="btn btn-danger" id="del" onclick="deleteTask('${tasks[i].title}')">Delete</button>
        </div>
      </div>`;
    }
  }
}

function deleteTask(title) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  console.log(tasks);

  for(let i = 0; i < tasks.length; i++){
    if(title === tasks[i].title){
      tasks.splice(i,1);
    }
  }
  console.log(tasks);
  localStorage.setItem('tasks',JSON.stringify(tasks));
  showTasks();
}

showTasks();
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

form.addEventListener("submit", e => {
  e.preventDefault();
  if (!input.value.trim()) return;

  addTask(input.value);
  input.value = "";
  saveTasks();
});

function addTask(text, completed = false) {
  const li = document.createElement("li");
  li.innerHTML = `${text} <button>X</button>`;

  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  li.querySelector("button").addEventListener("click", e => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  list.appendChild(li);
}

document.querySelectorAll("#filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    filterTasks(btn.dataset.filter);
  });
});

function filterTasks(type) {
  document.querySelectorAll("#task-list li").forEach(li => {
    if (type === "all") {
      li.style.display = "flex";
    } else if (type === "active") {
      li.style.display = li.classList.contains("completed") ? "none" : "flex";
    } else {
      li.style.display = li.classList.contains("completed") ? "flex" : "none";
    }
  });
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      completed: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  try {
    const raw = localStorage.getItem("tasks");
    const tasks = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(tasks)) throw new Error();

    tasks.forEach(t => {
      if (t && typeof t.text === "string") {
        addTask(t.text, t.completed);
      }
    });
  } catch {
    localStorage.setItem("tasks", "[]");
  }
}


loadTasks();

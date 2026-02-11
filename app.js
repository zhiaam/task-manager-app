const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

form.addEventListener("submit", e => {
  e.preventDefault();
  addTask(input.value);
  input.value = "";
});

function addTask(text) {
  const li = document.createElement("li");
  li.innerHTML = `${text} <button>X</button>`;
  list.appendChild(li);
}

li.addEventListener("click", () => {
  li.classList.toggle("done");
});

li.querySelector("button").onclick = () => li.remove();

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

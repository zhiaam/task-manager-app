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

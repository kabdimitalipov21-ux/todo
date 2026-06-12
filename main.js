let todos = [
  { id: 1, title: "Купить хлеба", completed: true },
  { id: 2, title: "Купить молоко", completed: true },
  { id: 3, title: "Сделать урок", completed: false },
];

const btn = document.querySelector(".create");
const inp = document.querySelector(".create-input");
const list = document.querySelector(".list");
const delAll = document.querySelector(".del-all");
const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

delAll.addEventListener("click", () => {
  todos = [];
  render();
});

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (inp.value.trim() === "") return;

  todos.push({
    id: Date.now(),
    title: inp.value,
    completed: false,
  });

  inp.value = "";
  render();
});

const render = () => {
  list.innerHTML = "";

  todos.forEach((el) => {
    list.innerHTML += `
      <div class="list-item add-animation">
        <input 
          type="checkbox" 
          ${el.completed ? "checked" : ""} 
          data-id="${el.id}" 
          class="complete-todo" 
        />

        <p ${el.completed ? "class='title-completed'" : ""} data-id="${el.id}">
          ${el.title}
        </p>

        <button class="edit-todo" data-id="${el.id}">Редактировать</button>
        <button class="del-todo" data-id="${el.id}">Удалить</button>
      </div>
    `;
  });

  document.querySelectorAll(".complete-todo").forEach((el) => {
    el.addEventListener("click", () => {
      todos = todos.map((todo) => {
        if (Number(todo.id) === Number(el.dataset.id)) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      render();
    });
  });

  document.querySelectorAll(".del-todo").forEach((el) => {
    el.addEventListener("click", () => {
      todos = todos.filter((todo) => Number(todo.id) !== Number(el.dataset.id));
      render();
    });
  });

  document.querySelectorAll(".edit-todo").forEach((el) => {
    el.addEventListener("click", () => {
      const id = Number(el.dataset.id);
      const item = el.parentNode;
      const p = document.querySelector(`p[data-id="${id}"]`);
      const delBtn = document.querySelector(`.del-todo[data-id="${id}"]`);

      item.classList.add("edit-animation");

      const input = document.createElement("input");
      const saveBtn = document.createElement("button");
      const resetBtn = document.createElement("button");

      input.className = "edit-input";
      input.value = p.textContent.trim();

      saveBtn.textContent = "Сохранить";
      saveBtn.className = "save-btn";

      resetBtn.textContent = "Сбросить";
      resetBtn.className = "reset-btn";

      resetBtn.onclick = () => {
        render();
      };

      saveBtn.onclick = () => {
        item.classList.add("save-animation");

        setTimeout(() => {
          todos = todos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, title: input.value };
            }
            return todo;
          });

          render();
        }, 300);
      };

      item.append(input, saveBtn, resetBtn);

      p.remove();
      el.remove();
      delBtn.remove();
    });
  });
};

render();
let todos = [
  { id: 1, title: "Купить хлеба", completed: true },
  { id: 2, title: "Купить хлеба", completed: true },
  { id: 3, title: "Купить хлеба", completed: false },
];

const btn = document.querySelector(".create");
const inp = document.querySelector(".create-input");
const list = document.querySelector(".list");
const delAll = document.querySelector(".del-all");

delAll.addEventListener("click", (e) => {
  e.preventDefault();

  todos = [];
  render();
});

btn.addEventListener("click", (e) => {
  e.preventDefault();

  // после того как нажали кнопку добавляем в массив новый todo
  todos.push({
    id: Date.now(),
    title: inp.value,
    completed: false,
  });

  // вызываем render, но он будет работать с уже обновленным массивом
  render();
});

// render - проходится по массиву todos и добавляет в HTML в тег div.list новые элементы (по очереди)
const render = () => {
  list.innerHTML = "";

  todos.forEach((el) => {
    // data-id - указываю в атрибутах id самого todo
    list.innerHTML += `
    <div class="list-item">
          <input type="checkbox" name="" ${el.completed ? "checked" : ""} id="" data-id="${el.id}" class="complete-todo" />
          <p ${el.completed ? "class='title-completed'" : ""}>${el.title}</p>
          <button>Редактировать</button>
          <button data-id="${el.id}" class="del-todo">Удалить</button>
        </div>
    `;
  });

  // вытаскиваю абсолютно все кнопки "Удалить"
  const delTodos = document.querySelectorAll(".del-todo");
  // вытаскиваю абсолютно все checkbox
  const completeTodos = document.querySelectorAll(".complete-todo");

  completeTodos.forEach((el) => {
    el.addEventListener("click", (e) => {
      todos = todos.map((todo) => {
        if (Number(todo.id) === Number(el.getAttribute("data-id"))) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      console.log(todos);
      render();
    });
  });

  // прохожусь по ним
  delTodos.forEach((el) => {
    // на каждое подвязываю обработчик события
    el.addEventListener("click", (e) => {
      // фильтрация (убирает элемент определенный)
      todos = todos.filter(
        // el.getAttribute('data-id') - позволяет вытащить значение которое мы ранее задали
        (todo) => Number(todo.id) !== Number(el.getAttribute("data-id")),
      );
      // заново рисуем
      render();
    });
  });
};

// первая отрисовка (если в массиве уже есть todo)
render();

import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/Popup.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");

const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    (isCompleted) => {
      todoCounter.updateCompleted(isCompleted);
    },
    (isCompleted) => {
      todoCounter.updateTotal(false);

      if (isCompleted) {
        todoCounter.updateCompleted(false);
      }
    }
  );
  const todoElement = todo.getView();

  return todoElement;
};

const renderer = (item) => {
  return generateTodo(item);
};

const todoSection = new Section({
  items: initialTodos,
  renderer,
  containerSelector: ".todos__list",
});

const addTodoPopupInstance = new PopupWithForm("#add-todo-popup", (formValues) => {
  const date = new Date(formValues.date);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = {
    id: uuidv4(),
    name: formValues.name,
    date,
    completed: false,
  };
  const todo = renderer(values);
  todoSection.addItem(todo);
  todoCounter.updateTotal(true);

  addTodoForm.reset();
  addTodoFormValidator.resetValidation();
});

addTodoButton.addEventListener("click", () => {
  addTodoPopupInstance.open();
});

todoSection.renderItems();

addTodoFormValidator.enableValidation();
addTodoPopupInstance.setEventListeners();

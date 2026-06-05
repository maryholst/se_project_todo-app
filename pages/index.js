import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const todosList = document.querySelector(".todos__list");

const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
const addTodoPopupInstance = new Popup("#add-todo-popup");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();

  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoPopupInstance.open();
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = {
    id: uuidv4(),
    name,
    date,
    completed: false,
  };
  const todo = generateTodo(values);
  todosList.append(todo);
  addTodoPopupInstance.close();

  addTodoForm.reset();
  addTodoFormValidator.resetValidation();
});

const renderTodo = (item) => {
  const todoElement = generateTodo(item);
  todosList.append(todoElement);
};

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

addTodoFormValidator.enableValidation();
addTodoPopupInstance.setEventListeners();

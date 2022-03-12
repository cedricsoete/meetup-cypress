import React, { useContext, useState } from "react";
import TodoModel from "../models/todo";
import { TodoContext } from "../store/store-todo";
import classes from "./TodoDetails.module.css";

export interface TodoDetailsProps {
  todo: TodoModel;
}
const TodoDetails = ({ todo }: TodoDetailsProps) => {
  const [todoText, setTodoText] = useState<string>(todo.text);
  const [editing, setEditing] = useState<boolean>(false);

  const todoCtx = useContext(TodoContext);
  const removeTodo = todoCtx.removeTodo;
  const checkTodo = todoCtx.checkTodo;
  const updateTodo = todoCtx.updateTodo;

  const removeTodoHanlder = () => {
    removeTodo(todo.code!);
  };

  const checkTodoHandler = () => {
    checkTodo(todo.code!);
  };

  const saveEditTodoHandler = () => {
    updateTodo(todo.code!, todoText);
    setEditing(false);
  };

  const onEnterPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      saveEditTodoHandler();
      setEditing(false);
      return;
    }
  };
  const todo_completed = todo.complete ? classes["todo-item_completed"] : "";

  const todo_editing = editing ? classes["todo-item_editing"] : "";

  const hide = editing ? classes.hide : "";

  return (
    <div data-cy="todo-detail" data-complete={todo.complete} className={`${classes.todo_item} ${todo_completed} ${todo_editing}`}>
      <div className={classes.cell}>
        <button
          data-cy="checked"
          className={`${classes.icon} ${classes.checkIcon} ${hide}`}
          onClick={checkTodoHandler.bind(null, todo.id)}
        >
          <i className="far fa-check-circle"></i>
        </button>
      </div>
      <div className={classes.cell}>
        {!editing && <div data-cy="title" className={classes.title}>{todoText}</div>}
        {editing && (
          <input
            data-cy="edit-title"
            onKeyPress={onEnterPressHandler}
            className={classes.input}
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          ></input>
        )}
      </div>
      <div className={classes.cell}>
        <button
          name="edit"
          data-cy="edit"
          className={`${classes.icon} ${hide}`}
          onClick={() => setEditing(true)}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          data-cy="delete"
          className={`${classes.icon} ${hide}`}
          onClick={removeTodoHanlder.bind(null, todo.id)}
        >
          <i className="fas fa-eraser"></i>
        </button>
        <button
          data-cy="save"
          className={`${classes.icon} ${!editing ? classes.hide : ""}`}
          onClick={saveEditTodoHandler}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default TodoDetails;

// Adding edit function, need to figure out a way to turn of Editng and Change todo TExt in the same time

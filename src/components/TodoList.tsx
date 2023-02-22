"use client";

import React from "react";
import { deleteTodo, toggleTodo, useTodos, type Todo } from "~/api";

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => (
  <li>
    <label
    // className={`${styles.label} ${todo.completed ? styles.checked : ""}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={async () => toggleTodo(todo)}
      />
      {todo.text}
    </label>

    <button onClick={async () => deleteTodo(todo.id)}>✕</button>
  </li>
);

const TodoList: React.FC = () => {
  const { data: todos, error } = useTodos();

  if (error != null) return <div>Error loading todos...</div>;
  if (todos == null) return <div>Loading...</div>;

  if (todos.length === 0) {
    return <div>Try adding a todo ☝️️</div>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;

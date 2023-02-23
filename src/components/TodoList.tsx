"use client";

import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type Todo = {
  id: string;
  created: string;
  text: string;
  completed: boolean;
};

const removeTodo = async (id: string) => {
  const res = await fetch(`/api/todos?todoId=${id}`, {
    method: "DELETE",
  });
  return res.json();
};

const toggleTodo = async (todo: Todo) => {
  const res = await fetch(`/api/todos?todoId=${todo.id}`, {
    method: "PUT",
    body: JSON.stringify({ completed: !todo.completed }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const queryClient = useQueryClient();

  // Mutations
  const mutationDelete = useMutation({
    mutationFn: removeTodo,
    onSuccess: () => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const mutationToggle = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <li>
      <label
      // className={`${styles.label} ${todo.completed ? styles.checked : ""}`}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => mutationToggle.mutate(todo)}
        />
        {todo.text}
      </label>

      <button onClick={() => mutationDelete.mutate(todo.id)}>✕</button>
    </li>
  );
};

const getTodos = async () => {
  const res = await fetch("/api/todos");
  return res.json();
};

const TodoList: React.FC = () => {
  const { data: todos, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (isError) return <div>Error loading todos...</div>;
  if (todos == null) return <div>Loading...</div>;

  if (todos.length === 0) {
    return <div>Try adding a todo ☝️️</div>;
  }

  return (
    <ul>
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;

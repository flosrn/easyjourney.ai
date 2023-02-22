import useSWR, { mutate } from "swr";

export type Todo = {
  id: string;
  created: string;
  text: string;
  completed: boolean;
};

const todoPath = "/api/todos";

export const useTodos = () => useSWR<Todo[]>(todoPath);

export const createTodo = async (text: string) => {
  await mutate(
    todoPath,
    (todos) => [{ text, completed: false, id: "new-todo" }, ...todos],
    false
  );
  await fetch(todoPath, {
    method: "POST",
    body: JSON.stringify({ text }),
  });

  await mutate(todoPath);
};

export const toggleTodo = async (todo: Todo) => {
  await mutate(
    todoPath,
    (todos) =>
      todos.map((t: { id: string; completed: never }) =>
        t.id === todo.id ? { ...todo, completed: !t.completed } : t
      ),
    false
  );
  await fetch(`${todoPath}?todoId=${todo.id}`, {
    method: "PUT",
    body: JSON.stringify({ completed: !todo.completed }),
  });
  await mutate(todoPath);
};

export const deleteTodo = async (id: string) => {
  await mutate(
    todoPath,
    (todos) => todos.filter((t: { id: string }) => t.id !== id),
    false
  );
  await fetch(`${todoPath}?todoId=${id}`, { method: "DELETE" });
  await mutate(todoPath);
};

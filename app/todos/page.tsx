import React from "react";
import { prisma } from "~/server/db/prisma";

import AddTodoInput from "~/components/AddTodoInput";
import { TodoItem, type Todo } from "~/components/TodoList";

export default async function TodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <section className="container mt-24 grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Todos
          </h1>
        </div>
        <AddTodoInput />
        {/*<TodoList />*/}
        <ul>
          {todos.map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              todo={{ ...todo, createdAt: JSON.stringify(todo.createdAt) }}
            />
          ))}
        </ul>
      </section>
    </>
  );
}

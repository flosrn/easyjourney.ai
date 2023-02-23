"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postTodo = async (text: string) => {
  const res = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const AddTodoInput = () => {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        mutation.mutate(text);
        setText("");
      }}
    >
      <input
        placeholder="Buy some milk"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

export default AddTodoInput;

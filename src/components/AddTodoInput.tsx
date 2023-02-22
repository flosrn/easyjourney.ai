"use client";

import { useState } from "react";
import { createTodo } from "~/api";

const AddTodoInput = () => {
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await createTodo(text);
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

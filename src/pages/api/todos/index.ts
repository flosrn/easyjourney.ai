import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (req.method) {
    case "GET": {
      // get all todos
      const todos = await prisma.todo.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.json(todos);

      break;
    }
    case "POST": {
      // create todo
      const { text } = req.body;
      const todo = await prisma.todo.create({
        data: { text, completed: false },
      });

      res.json(todo);

      break;
    }
    case "PUT": {
      // update todo
      const id = req.query.todoId as string;
      const data = req.body;
      const todo = await prisma.todo.update({
        where: { id },
        data,
      });

      res.json(todo);

      break;
    }
    case "DELETE": {
      // delete todo
      const id = req.query.todoId as string;
      await prisma.todo.delete({ where: { id } });

      res.json({ status: "ok" });

      break;
    }
    // No default
  }
};

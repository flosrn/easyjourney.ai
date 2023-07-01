import { useMutation } from "@tanstack/react-query";
import { UserMinus2, UserPlus2Icon } from "lucide-react";

import { Button } from "~/components/ui/button";

const addCollaborator = async ({ boardId, userId }) => {
  const response = await fetch(`/api/boards/collaborators/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, boardId }),
  });
  const data = await response.json();
  return data;
};

const deleteCollaborator = async ({ boardId, userId }) => {
  const response = await fetch(
    `/api/boards/collaborators/actual-collaborators/delete`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, boardId }),
    }
  );
  const data = await response.json();
  return data;
};

export function AddOrDeleteButton({ boardId, userId, isCollaborator }) {
  const mutationAdd = useMutation({
    mutationFn: async () => addCollaborator({ boardId, userId }),
  });

  const handleAddCollaborator = () => {
    console.log("handleAddCollaborator");
    mutationAdd.mutate({ boardId, userId });
  };

  const mutationDelete = useMutation({
    mutationFn: async () => deleteCollaborator({ boardId, userId }),
  });

  const handleDeleteCollaborator = () => {
    console.log("handleDeleteCollaborator");
  };

  return (
    <>
      {isCollaborator ? (
        <Button
          className="mr-1 h-7 w-7 p-1"
          variant="error"
          onClick={handleDeleteCollaborator}
        >
          <UserMinus2 />
        </Button>
      ) : (
        <Button
          className="mr-1 h-7 w-7 p-1"
          variant="success"
          onClick={handleAddCollaborator}
        >
          <UserPlus2Icon />
        </Button>
      )}
    </>
  );
}

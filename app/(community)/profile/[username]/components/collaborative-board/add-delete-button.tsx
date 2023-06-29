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

export function AddOrDeleteButton({ boardId, userId }) {
  const mutation = useMutation({
    mutationFn: async () => addCollaborator({ boardId, userId }),
  });

  const handleAddCollaborator = () => {
    console.log("handleAddCollaborator");
    mutation.mutate({ boardId, userId });
  };

  return (
    <>
      <Button
        className="mr-1 h-7 w-7 p-1"
        variant="success"
        onClick={handleAddCollaborator}
      >
        <UserPlus2Icon />
      </Button>
    </>
  );
}

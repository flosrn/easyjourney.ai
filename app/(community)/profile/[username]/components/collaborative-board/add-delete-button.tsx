import { useMutation } from "@tanstack/react-query";

import { Button } from "~/components/ui/button";

const addCollaborator = async (boardId: string, userId: string) => {
  const response = await fetch(
    `/api/boards/collaborators/add?boardId=${boardId}&userId=${userId}`
  );
  const data = await response.json();
  return data;
};

export function AddOrDeleteButton({ boardId, userId }) {
  const { mutate, isLoading } = useMutation(addCollaborator);

  const handleAddCollaborator = () => {
    mutate({ boardId, userId });
  };

  return (
    <>
      <Button variant="success" onClick={handleAddCollaborator}>
        +
      </Button>
    </>
  );
}

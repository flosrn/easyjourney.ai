"use client";

import React from "react";
import type { LucideProps } from "lucide-react";
import { Loader2Icon } from "lucide-react";

import { Button } from "~/components/ui/button";

type ActionButtonProps = {
  label: string;
  Icon: React.ComponentType<LucideProps>;
  isLoading?: boolean;
  isDisabled?: boolean;
  clickHandler: () => void;
};

const ActionButton = ({
  label,
  Icon,
  isLoading,
  isDisabled,
  clickHandler,
}: ActionButtonProps) => {
  return (
    <Button onClick={clickHandler} disabled={isLoading ?? isDisabled}>
      {isLoading ? (
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icon className="h-4 w-4 md:mr-2" />
      )}
      <span className="hidden md:block">{label}</span>
    </Button>
  );
};

export default ActionButton;

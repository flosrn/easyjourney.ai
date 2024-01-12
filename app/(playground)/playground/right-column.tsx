import React from "react";
import type { PromptHistory } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { ScrollArea } from "~/components/ui/scroll-area";

import { cn } from "~/lib/classNames";

import LabelWithTooltip from "./components/sidebar/label-with-tooltip";

type RightColumnProps = React.HTMLAttributes<HTMLDivElement> & {};

const getPromptsHistory = async () => {
  console.log("getPromptsHistory");
  const response = await fetch("/api/prompts");
  const { prompts } = await response.json();

  return prompts;
};

const RightColumn = ({ className }: RightColumnProps) => {
  const promptsQuery = useQuery<PromptHistory[]>({
    queryKey: ["prompts"],
    queryFn: async () => getPromptsHistory(),
    // enabled: open,
  });

  console.log("promptsQuery.data :", promptsQuery.data);

  return (
    <ScrollArea className={cn("w-full border-l", className)}>
      <div className="absolute top-0 z-10 w-full space-y-4 border-b bg-background p-4">
        <LabelWithTooltip
          size="xl"
          title="Prompts history"
          description="A list of all the prompts you have used in the past."
          className="hidden md:block"
        />
      </div>
      <div className="mt-14 divide-y">
        {promptsQuery.data?.map((data) => (
          <div key={data.id} className="space-y-1 bg-background p-4 text-sm">
            {data.prompt}
          </div>
        ))}
        {promptsQuery.data?.map((data) => (
          <div key={data.id} className="space-y-1 bg-background p-4 text-sm">
            {data.prompt}
          </div>
        ))}
        {promptsQuery.data?.map((data) => (
          <div key={data.id} className="space-y-1 bg-background p-4 text-sm">
            {data.prompt}
          </div>
        ))}
        {promptsQuery.data?.map((data) => (
          <div key={data.id} className="space-y-1 bg-background p-4 text-sm">
            {data.prompt}
          </div>
        ))}
        {promptsQuery.data?.map((data) => (
          <div key={data.id} className="space-y-1 bg-background p-4 text-sm">
            {data.prompt}
          </div>
        ))}
        {promptsQuery.data?.map((data) => (
          <div key={data.id} className="space-y-1 bg-background p-4 text-sm">
            {data.prompt}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default RightColumn;

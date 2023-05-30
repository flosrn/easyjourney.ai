"use client";

import React from "react";
import { RedoIcon, Trash2Icon, UndoIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { Button } from "~/components/ui/Button";
import { Separator } from "~/components/ui/Separator";

import TextareaPrompt from "./components/input/Textarea";
import SideColumn from "./SideColumn";

const MainColumn = () => {
  const { data: session } = useSession();
  const username = session?.user.username;

  const message = "This is a message";

  return (
    <main className="relative col-span-3 flex flex-col lg:col-span-4 lg:border-l">
      <div className="h-full grow px-4 py-6 xl:px-8">
        <div className="h-full flex-col border-none p-0 data-[state=active]:flex">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Dashboard
              </h2>
              <p className="text-sm text-muted-foreground">
                Welcome back, {username}!
              </p>
            </div>
            <div className="ml-auto flex space-x-2">
              <>
                <Button
                  // onClick={handlePreviousImage}
                  // disabled={isLoading || isFirst}
                  variant="outline"
                >
                  <UndoIcon className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:block">Undo</span>
                </Button>
                <Button
                  // onClick={handleNextImage}
                  // disabled={isLoading || isLast || !hasImages}
                  variant="outline"
                >
                  <RedoIcon className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:block">Redo</span>
                </Button>
                <Button
                  // onClick={handleClear}
                  variant="secondary"
                  // disabled={isEmpty}
                >
                  <Trash2Icon className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:block">Clear</span>
                </Button>
              </>
              <Button
              // onClick={async () => generateImage(prompt)}
              // disabled={isLoading}
              >
                {/*{isGenerationLoading ? (*/}
                {/*  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />*/}
                {/*) : (*/}
                {/*  <BrushIcon className="h-4 w-4 md:mr-2" />*/}
                {/*)}*/}
                <span className="hidden md:block">Generate</span>
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
          <TextareaPrompt />
          <SideColumn className="lg:hidden" />
        </div>
      </div>
      <div className="flex-center sticky bottom-0 h-6 border-t bg-background">
        <p className="px-4 text-xs">{message}</p>
      </div>
      <Toaster position="bottom-right" />
    </main>
  );
};

export default MainColumn;

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { DownloadIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

type DownloadButtonProps = {
  imageUrl: string;
  filename: string | null;
  hasHoverAnim?: boolean;
};

const DownloadButton = ({
  imageUrl,
  filename,
  hasHoverAnim,
}: DownloadButtonProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleDownload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!imageUrl) return;
    if (!session) {
      return router.push("/api/auth/signin");
    }
    const imageUrlWithoutExtension = imageUrl.split(".webp")[0];
    const filenameWithoutExtension = filename?.split(".webp")[0];
    const imageInPng = `${imageUrlWithoutExtension}.png`;
    const filenameInPng = `${filenameWithoutExtension}.png`;
    saveAs(imageInPng, filenameInPng);
  };

  const MotionButton = motion(Button);

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionButton
            variant="outline"
            onClick={handleDownload}
            whileHover={hasHoverAnim ? { scale: 1.1 } : {}}
            whileTap={{ scale: 0.9 }}
            className="rounded-3xl"
          >
            <DownloadIcon className="h-4 w-4" />
          </MotionButton>
        </TooltipTrigger>
        <TooltipContent sideOffset={10} side="bottom" className="bg-accent">
          <p>Download</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DownloadButton;

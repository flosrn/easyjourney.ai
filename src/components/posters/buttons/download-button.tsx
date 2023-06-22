"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { saveAs } from "file-saver";
import { DownloadIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import TooltipButton from "~/components/posters/buttons/tooltip-button";

type DownloadButtonProps = {
  imageUrl: string;
  filename: string | null;
  hasHoverAnim?: boolean;
};

const DownloadButton = ({ imageUrl, filename }: DownloadButtonProps) => {
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

  return (
    <TooltipButton Icon={DownloadIcon} clickHandler={handleDownload}>
      Download
    </TooltipButton>
  );
};

export default DownloadButton;

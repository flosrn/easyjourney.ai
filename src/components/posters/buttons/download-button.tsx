"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { saveAs } from "file-saver";
import { DownloadIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import TooltipButton from "~/components/posters/buttons/tooltip-button";

type DownloadButtonProps = {
  imageUrl: string;
  filename: string | null;
  hasHoverAnim?: boolean;
};

const DownloadButton = ({ imageUrl, filename }: DownloadButtonProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const fakeDownload = async () => {
    if (!imageUrl) return;
    if (!session) return router.push("/api/auth/signin");
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const hasWebp = imageUrl.includes(".webp");
          const imageUrlWithoutExtension =
            hasWebp && imageUrl.split(".webp")[0];
          const filenameWithoutExtension =
            hasWebp && filename?.split(".webp")[0];
          const imageInPng = hasWebp
            ? `${imageUrlWithoutExtension}.png`
            : imageUrl;
          const filenameInPng = hasWebp
            ? `${filenameWithoutExtension}.png`
            : filename;
          saveAs(imageInPng, filenameInPng ?? "poster.png");
          resolve(true);
        } catch {
          resolve(false);
        }
      }, 2000);
    });
  };

  const handleDownload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await toast.promise(fakeDownload(), {
      loading: "Downloading...",
      success: "Poster downloaded!",
      error: "Something went wrong",
    });
  };

  return (
    <TooltipButton Icon={DownloadIcon} clickHandler={handleDownload}>
      Download
    </TooltipButton>
  );
};

export default DownloadButton;

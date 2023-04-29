import { ImageIcon } from "lucide-react";

import { useImageGenerationStore } from "../store/imageGenerationStore";
import LoadingDots from "./LoadingDots";

type ImageContainerProps = {};

const ImageContainer = ({}: ImageContainerProps) => {
  const [image, message] = useImageGenerationStore((state) => [
    state.image,
    state.message,
  ]);
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed p-4">
      {image?.url ? (
        <img
          src={image.url}
          alt=""
          className="h-full min-w-[420px] rounded-md"
        />
      ) : (
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          {message ? (
            <div className="flex-center flex-col">
              <p className="text-muted-foreground my-4 text-sm">{message}</p>
              <LoadingDots />
            </div>
          ) : (
            <>
              <ImageIcon className="text-muted-foreground h-10 w-10" />
              <h3 className="mt-4 text-lg font-semibold">
                No poster generated
              </h3>
              <p className="text-muted-foreground mb-4 mt-2 text-sm">
                You have not generate any poster.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageContainer;

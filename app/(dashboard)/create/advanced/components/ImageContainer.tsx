import { ImageIcon } from "lucide-react";

const ImageContainer = () => {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <ImageIcon className="text-muted-foreground h-10 w-10" />
        <h3 className="mt-4 text-lg font-semibold">No poster generated</h3>
        <p className="text-muted-foreground mb-4 mt-2 text-sm">
          You have not generate any poster.
        </p>
      </div>
    </div>
  );
};

export default ImageContainer;

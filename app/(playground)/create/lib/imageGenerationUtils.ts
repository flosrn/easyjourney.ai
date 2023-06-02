import type {
  ImageData,
  ImageGenerationSetAction,
} from "../store/imageGenerationStore";

export const handleMessageData = ({
  image,
  setImageType,
  setMessage,
  setIsLoading,
  setLoadingType,
}: {
  image: ImageData | undefined;
  setImageType: ImageGenerationSetAction["setImageType"];
  setMessage: ImageGenerationSetAction["setMessage"];
  setIsLoading: ImageGenerationSetAction["setIsLoading"];
  setLoadingType: ImageGenerationSetAction["setLoadingType"];
}) => {
  setLoadingType(null);
  switch (image?.type) {
    case "loading": {
      break;
    }
    case "image_iteration": {
      break;
    }
    case "generation_complete": {
      console.log("generation_complete");
      setImageType("generation");
      setMessage("Tips: click on one of the four images to continue");
      setIsLoading(false);
      break;
    }
    case "image_upscaled": {
      setImageType("upscale");
      setMessage("");
      setIsLoading(false);
      break;
    }
    case "variation_complete": {
      setImageType("variation");
      setMessage("Tips: click on one of the four images to continue");
      setIsLoading(false);
      break;
    }
    case "generation_failed": {
      break;
    }
    case "message_not_found": {
      break;
    }
    default: {
      break;
    }
  }
};

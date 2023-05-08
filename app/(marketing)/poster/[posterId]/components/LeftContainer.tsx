import Image from "next/image";

const LeftContainer = ({ image, prompt, id }) => {
  return (
    <div>
      <Image
        src={image}
        alt={prompt}
        width="1280"
        height="1280"
        className="rounded-lg"
      />
    </div>
  );
};

export default LeftContainer;

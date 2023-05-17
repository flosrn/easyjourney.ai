import React from "react";
import twemoji from "twemoji";

type EmojiIconProps = {
  icon: string;
};

const EmojiIcon = ({ icon }: EmojiIconProps) => {
  const emojiHTML = twemoji.parse(icon, {
    folder: "svg",
    ext: ".svg",
  });
  const emojis: string[] = [];
  emojiHTML.split(">").map((item) => {
    const match = item.match(/src="([^"]+)"/);
    if (match) {
      emojis.push(match[1]);
    }
  });
  return (
    <>
      {emojis.map((emoji) => (
        <img key={emoji} src={emoji} alt={emoji} className="mr-1 h-5 w-5" />
      ))}
    </>
  );
};

export default EmojiIcon;

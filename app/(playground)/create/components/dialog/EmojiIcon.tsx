import React from "react";
import twemoji from "twemoji";

import { cn } from "~/lib/classNames";

type EmojiIconProps = {
  icon: string;
  className?: string;
};

const EmojiIcon = ({ icon, className }: EmojiIconProps) => {
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
  const isSingleEmoji = emojis.length === 1;
  const emoji = isSingleEmoji ? emojis[0] : emojis[1];
  return (
    <img
      key={emoji}
      src={emoji}
      alt={emoji}
      className={cn("flex h-5 w-5", className)}
    />
  );
};

export default EmojiIcon;

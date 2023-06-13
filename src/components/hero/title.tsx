import React from "react";

import TextTitleAnimated from "~/components/hero/text-title-animated";

type TitleProps = {};

const Title = ({}: TitleProps) => (
  <div className="flex-center absolute inset-0 z-10 mt-7 bg-gradient-radial from-background/95 via-background/60 to-background/5 backdrop-blur-[1.5px]">
    <section className="flex max-w-2xl flex-col items-center gap-2 space-y-2 px-5">
      <TextTitleAnimated />
    </section>
  </div>
);

export default Title;

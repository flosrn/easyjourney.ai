import React from "react";

import MidjourneyPrompt from "./MidjourneyPrompt";

export default async function CreatePage() {
  return (
    <>
      <section className="container mt-6 grid items-center justify-center gap-6 pb-8">
        <div className="flex max-w-[980px] flex-col items-center gap-2">
          <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Myposter.ai
          </h1>
          <h2 className="text-center text-2xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-4xl">
            Generate beautiful posters in seconds with AI
          </h2>
          <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            Myposter.ai is a free tool that uses{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text font-extrabold text-transparent">
              MidJourney API
            </span>{" "}
            to generate your own beautiful posters in seconds. Create it and
            print it, it's so easy, you will receive your poster in 3 days.
          </p>
        </div>
        <MidjourneyPrompt />
      </section>
    </>
  );
}

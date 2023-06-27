import React from "react";
import Image from "next/image";
import { prisma } from "~/server/db/prisma";
import {
  BrushIcon,
  EyeIcon,
  GlobeIcon,
  LightbulbIcon,
  LogOutIcon,
  MouseIcon,
  SailboatIcon,
  StickerIcon,
  UsersIcon,
  UserSquareIcon,
} from "lucide-react";

import Header from "~/components/header/header";
import AnimatedPosters from "~/components/hero/animated-posters";
import ScrollToSection from "~/components/hero/scroll-to-section";
import TextTitleAnimated from "~/components/hero/text-title-animated";

import type { Posters as PosterType } from "~/types/poster";

const getPopularPosters = async () =>
  prisma.poster.findMany({
    where: {
      isPublic: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });

const featuresSection1 = [
  {
    name: "Intuitive Design",
    description:
      "Experience the power of creating posters with Midjourney like never before.",
    icon: BrushIcon,
  },
  {
    name: "Freedom from Discord",
    description:
      "Say goodbye to complex Discord commands. No more confusing documentation. All Midjourney features at your fingertips.",
    icon: LogOutIcon,
  },
  {
    name: "Art Made Simple",
    description:
      "From beginners to experts, we've made the creative process enjoyable and accessible for all.",
    icon: StickerIcon,
  },
];

const featuresSection2 = [
  {
    name: "Unlimited Inspiration",
    description:
      "Discover over 5000+ filters to inspire your creativity. A whole universe of artistic possibilities awaits.",
    icon: LightbulbIcon,
  },
  {
    name: "Transform Your Art",
    description:
      "Unleash your artistic potential. Transform your posters with upscaling, variation, or zooming options.",
    icon: SailboatIcon,
  },
  {
    name: "Precise Preview",
    description:
      "What you see is what you get. Select the perfect ratio and preview the exact size of your masterpiece before you create it.",
    icon: EyeIcon,
  },
];

const featuresSection3 = [
  {
    name: "A Social Network for AI Artists",
    description:
      "Become a part of a thriving community of creators. Like, share, follow, and discover AI artists around the globe.",
    icon: GlobeIcon,
  },
  {
    name: "Personal Art Gallery",
    description:
      "Your profile is your digital canvas. Curate, showcase, and take pride in your AI art creations.",
    icon: UserSquareIcon,
  },
  {
    name: "Collaborate and Co-create",
    description:
      "Create boards for your projects. Invite others to co-create, share ideas, and foster a collective creative experience.",
    icon: UsersIcon,
  },
];

export default async function IndexPage() {
  const posters = await getPopularPosters();
  const columns: PosterType[] = [[], [], [], [], [], [], [], [], [], []];

  posters.map((poster, index) => {
    columns[index % 10].push(poster);
  });
  posters.map((poster, index) => {
    columns[index % 10].push(poster);
  });

  return (
    <>
      <Header />
      <main className="h-full w-full">
        <section
          id="hero-section"
          className="relative h-full w-full overflow-hidden"
        >
          <AnimatedPosters columns={columns} />
          <div className="flex-center absolute inset-0 h-full w-full bg-gradient-radial from-background/95 via-background/60 to-background/5 backdrop-blur-[1.5px]">
            <div className="max-w-2xl px-5">
              <TextTitleAnimated />
            </div>
            <div className="flex-center absolute inset-x-0 bottom-14">
              <ScrollToSection id="features-global-section">
                <MouseIcon className="h-8 w-8" />
              </ScrollToSection>
            </div>
          </div>
        </section>
        <section
          id="features-global-section"
          className="flex-center container overflow-hidden bg-background py-24 sm:py-32"
        >
          <div className="mx-auto">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="text-base font-semibold leading-7 text-primary">
                    Embrace Simplicity
                  </h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Poster Creation Reinvented
                  </p>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Step into an innovative approach to poster creation. Break
                    free from Discord's restrictions, unlock Midjourney's full
                    potential, and bring your artistic visions to life
                    effortlessly.
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
                    {featuresSection1.map((feature) => (
                      <div key={feature.name} className="relative pl-9">
                        <dt className="inline font-semibold text-foreground">
                          <feature.icon
                            className="absolute left-1 top-1 h-5 w-5 text-primary"
                            aria-hidden="true"
                          />
                          {feature.name}
                        </dt>{" "}
                        <dd className="inline">{feature.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <Image
                src="/images/landingpage/easyjourney_create.png"
                alt="Easyjourney Product screenshot"
                width={2704}
                height={2030}
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-border/60 md:-ml-4 xl:-ml-24"
              />
            </div>
          </div>
        </section>
        <section
          id="features-filters-section"
          className="flex-center container overflow-hidden bg-background py-24 sm:py-32"
        >
          <div className="mx-auto">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <video
                autoPlay
                loop
                muted
                preload="metadata"
                className="w-full rounded-xl shadow-xl ring-1 ring-border/60"
              >
                <source src="/videos/filters.mp4" />
              </video>
              <div className="lg:pl-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="text-base font-semibold leading-7 text-primary">
                    Empower Your Imagination
                  </h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Your Art, Your Rules
                  </p>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Harness the power of choice and create with unlimited
                    freedom. Set your creativity free by perfecting each detail,
                    from filter selection to image ratios, you have control over
                    every aspect. Your vision, brought to life.
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
                    {featuresSection2.map((feature) => (
                      <div key={feature.name} className="relative pl-9">
                        <dt className="inline font-semibold text-foreground">
                          <feature.icon
                            className="absolute left-1 top-1 h-5 w-5 text-primary"
                            aria-hidden="true"
                          />
                          {feature.name}
                        </dt>{" "}
                        <dd className="inline">{feature.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features-global-section"
          className="flex-center container overflow-hidden bg-background py-24 sm:py-32"
        >
          <div className="mx-auto">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="text-base font-semibold leading-7 text-primary">
                    Build Community
                  </h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Connect with Creators
                  </p>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Dive into a network of artists. Display your unique posters
                    on your profile, engage with other creators, and collaborate
                    on shared boards. Welcome to the social side of AI art.
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
                    {featuresSection3.map((feature) => (
                      <div key={feature.name} className="relative pl-9">
                        <dt className="inline font-semibold text-foreground">
                          <feature.icon
                            className="absolute left-1 top-1 h-5 w-5 text-primary"
                            aria-hidden="true"
                          />
                          {feature.name}
                        </dt>{" "}
                        <dd className="inline">{feature.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <video
                autoPlay
                loop
                muted
                preload="metadata"
                className="w-full rounded-xl shadow-xl ring-1 ring-border/60"
              >
                <source src="/videos/filters.mp4" />
              </video>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

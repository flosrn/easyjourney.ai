import React from "react";
import Image from "next/image";
import Link from "next/link";
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

import FooterWithNewsletter from "~/components/footer/footer-with-newsletter";
import Header from "~/components/header/header";
import Image3D from "~/components/hero/image-3d";
import ScrollToSection from "~/components/hero/scroll-to-section";
import StarsParticles from "~/components/hero/stars-particles";
import TextAnimatedGradient from "~/components/hero/text-animated-gradient";
import { Button } from "~/components/ui/button";

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
      "From beginners to experts,we've made the creative process enjoyable for everyone with a rich set of advanced options.",
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
      <main>
        <section id="hero-section" className="flex-center relative lg:h-screen">
          <div className="container relative w-full bg-background py-16 md:py-32  -lg:overflow-hidden">
            <div className="relative z-10 mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8">
                <div className="space-y-6 md:space-y-8 lg:max-w-xl">
                  <Image
                    alt="Easyjourney Logo - Flying Fish"
                    src="/images/logo/flyingfish_hero.svg"
                    width={100}
                    height={100}
                    className="-md:hidden"
                  />
                  <h2 className="text-gradient-cosmos text-2xl font-bold lg:text-4xl">
                    Embrace Simplicity
                  </h2>
                  <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-7xl">
                    Poster Creation Reinvented
                  </h1>
                  <p className="text-md leading-8 text-muted-foreground md:text-lg">
                    Unlock the power of{" "}
                    <TextAnimatedGradient>Midjourney</TextAnimatedGradient> with
                    a beautiful and user-friendly interface. Create stunning
                    visuals with ease, no AI or prompt engineering expertise
                    required
                  </p>
                  <div className="pt-2 md:pt-6">
                    <Button asChild>
                      <Link href="/create">Create Art</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <Image3D />
            </div>
          </div>
          <StarsParticles />
          <ScrollToSection
            id="features-easy-section"
            className="absolute bottom-10 left-1/2 h-8 w-8 -translate-x-1/2 animate-bounce text-foreground"
          >
            <MouseIcon />
          </ScrollToSection>
        </section>
        <section
          id="features-easy-section"
          className="container overflow-hidden bg-background py-20"
        >
          <div className="mx-auto max-w-2xl lg:pr-8 lg:pt-4">
            <div className="space-y-8 text-center lg:max-w-xl">
              <h2 className="text-gradient-hyper text-base font-bold leading-7 text-primary lg:text-3xl">
                Design with Ease
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                Art Creation, Simplified
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Step into an innovative approach to poster creation. Break free
                from Discord's restrictions, unlock Midjourney's full potential,
                and bring your artistic visions to life effortlessly.
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:gap-8">
            <dl className="space-y-4 text-base text-muted-foreground xl:space-y-8">
              {featuresSection1.map((feature) => (
                <div
                  key={feature.name}
                  className="relative flex rounded-lg bg-muted px-6 py-4 xl:p-8"
                >
                  <div className="space-y-3">
                    <feature.icon
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                    <dt className="font-semibold text-foreground">
                      {feature.name}
                    </dt>
                    <dd className="">{feature.description}</dd>
                  </div>
                </div>
              ))}
            </dl>
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
        </section>
        <section
          id="features-creativity-section"
          className="container overflow-hidden bg-background py-24 sm:py-32"
        >
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
                <h2 className="text-gradient-royal text-base font-semibold leading-7 lg:text-3xl">
                  Empower Your Imagination
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Your Art, Your Rules
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Harness the power of choice and create with unlimited freedom.
                  Set your creativity free by perfecting each detail, from
                  filter selection to image ratios, you have control over every
                  aspect. Your vision, brought to life.
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
        </section>
        <section
          id="features-community-section"
          className="flex-center container overflow-hidden bg-background py-24 sm:py-32"
        >
          <div className="mx-auto">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="text-gradient-aqua text-base font-semibold leading-7 lg:text-3xl">
                    Build Community
                  </h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
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
      <FooterWithNewsletter />
    </>
  );
}

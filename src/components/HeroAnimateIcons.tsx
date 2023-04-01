"use client";

import React from "react";
import Image from "next/image";

import { Icons } from "~/components/Icons";

import { cn } from "~/lib/classNames";

import arc from "../../public/icons/arc.svg";
import chatgpt from "../../public/icons/chatgpt.svg";
import chrome from "../../public/icons/chrome.svg";
import css from "../../public/icons/css.svg";
import discord from "../../public/icons/discord.svg";
import figma from "../../public/icons/figma.svg";
import git from "../../public/icons/git.svg";
import github from "../../public/icons/github.svg";
import graphql from "../../public/icons/graphql.svg";
import html from "../../public/icons/html.svg";
import javascript from "../../public/icons/javascript.svg";
import nextjs from "../../public/icons/nextjs.svg";
import nodejs from "../../public/icons/nodejs.svg";
import raycast from "../../public/icons/raycast.svg";
import react from "../../public/icons/react.svg";
import shopify from "../../public/icons/shopify.svg";
import slack from "../../public/icons/slack.svg";
import stripe from "../../public/icons/stripe.svg";
import tailwind from "../../public/icons/tailwind.svg";
import telegram from "../../public/icons/telegram.svg";
import typescript from "../../public/icons/typescript.svg";
import vscode from "../../public/icons/vscode.svg";
import webstorm from "../../public/icons/webstorm.svg";
import bg from "../../public/images/backgrounds/splash.jpg";

const iconsListOne = [
  { src: html, alt: "html" },
  { src: figma, alt: "figma" },
  { src: slack, alt: "slack" },
  { src: arc, alt: "arc" },
  { src: typescript, alt: "typescript" },
  { src: chrome, alt: "chrome" },
  { src: discord, alt: "discord" },
];

const iconsListTwo = [
  { src: css, alt: "css" },
  { src: stripe, alt: "stripe" },
  { src: git, alt: "git" },
  { src: tailwind, alt: "tailwind" },
  { src: vscode, alt: "vscode" },
  { src: shopify, alt: "shopify" },
  { src: telegram, alt: "telegram" },
];

const iconsListThree = [
  { src: javascript, alt: "javascript" },
  { src: webstorm, alt: "webstorm" },
  { src: react, alt: "react" },
  { src: nextjs, alt: "nextjs" },
  { src: discord, alt: "discord" },
  { src: chatgpt, alt: "chatgpt" },
  { src: stripe, alt: "stripe" },
];

const iconsListFour = [
  { src: vscode, alt: "vscode" },
  { src: nodejs, alt: "nodejs" },
  { src: html, alt: "html" },
  { src: github, alt: "github" },
  { src: graphql, alt: "graphql" },
  { src: raycast, alt: "raycast" },
  { src: telegram, alt: "telegram" },
];

const HeroAnimateIcons = () => {
  return (
    <div className="HeroAnimateIconsWrapper relative h-[400px] select-none overflow-hidden">
      <div className="absolute -top-72 flex h-full w-full items-end justify-center space-x-5">
        {iconsListOne.map((icon, index) => (
          <div
            key={icon.alt}
            className={cn(
              "flex-center relative h-20 w-20 shrink-0 rounded-lg",
              index % 2 === 0 ? "animate-slidetop" : "animate-slidetop-slower"
            )}
          >
            <Icons.wrapper />
            <Image
              src={icon.src}
              alt={icon.alt}
              loading="eager"
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </div>
      <div className="absolute -top-48 flex h-full w-full items-end justify-center space-x-5">
        {iconsListTwo.map((icon, index) => (
          <div
            key={icon.alt}
            className={cn(
              "flex-center relative h-20 w-20 shrink-0 rounded-lg",
              index % 2 === 0 ? "animate-slidetop" : "animate-slidetop-slower"
            )}
          >
            <Icons.wrapper />
            <Image
              src={icon.src}
              alt={icon.alt}
              loading="eager"
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </div>
      <div className="absolute -top-24 flex h-full w-full items-end justify-center space-x-5">
        {iconsListThree.map((icon, index) => (
          <div
            key={icon.alt}
            className={cn(
              "flex-center relative h-20 w-20 shrink-0 rounded-lg",
              index % 2 === 0 ? "animate-slidetop" : "animate-slidetop-slower"
            )}
          >
            <Icons.wrapper />
            <Image
              src={icon.src}
              alt={icon.alt}
              loading="eager"
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </div>
      <div className="absolute top-0 flex h-full w-full items-end justify-center space-x-5">
        {iconsListFour.map((icon, index) => (
          <div
            key={icon.alt}
            className={cn(
              "flex-center relative h-20 w-20 shrink-0 rounded-lg",
              index % 2 === 0 ? "animate-slidetop" : "animate-slidetop-slower"
            )}
          >
            <Icons.wrapper />
            <Image
              src={icon.src}
              alt={icon.alt}
              loading="eager"
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </div>
      <div className="absolute top-24 flex h-full w-full items-end justify-center space-x-5">
        {iconsListOne.map((icon, index) => (
          <div
            key={icon.alt}
            className={cn(
              "flex-center relative h-20 w-20 shrink-0 rounded-lg",
              index % 2 === 0 ? "animate-slidetop" : "animate-slidetop-slower"
            )}
          >
            <Icons.wrapper />
            <Image
              src={icon.src}
              alt={icon.alt}
              loading="eager"
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </div>
      <div className="absolute top-48 flex h-full w-full items-end justify-center space-x-5">
        {iconsListTwo.map((icon, index) => (
          <div
            key={icon.alt}
            className={cn(
              "flex-center relative h-20 w-20 shrink-0 rounded-lg",
              index % 2 === 0 ? "animate-slidetop" : "animate-slidetop-slower"
            )}
          >
            <Icons.wrapper />
            <Image
              src={icon.src}
              alt={icon.alt}
              loading="eager"
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </div>
      <div className="absolute top-72 flex h-full w-full items-end justify-center space-x-5">
        {iconsListThree.map((icon, index) => (
          <div
            key={icon.alt}
            className={cn(
              "flex-center relative h-20 w-20 shrink-0 rounded-lg",
              index % 2 === 0 ? "animate-slidetop" : "animate-slidetop-slower"
            )}
          >
            <Icons.wrapper />
            <Image
              src={icon.src}
              alt={icon.alt}
              loading="eager"
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </div>
      <div className="absolute top-96 flex h-full w-full items-end justify-center space-x-5">
        {iconsListFour.map((icon, index) => (
          <div
            key={icon.alt}
            className={cn(
              "flex-center relative h-20 w-20 shrink-0 rounded-lg",
              index % 2 === 0 ? "animate-slidetop" : "animate-slidetop-slower"
            )}
          >
            <Icons.wrapper />
            <Image
              src={icon.src}
              alt={icon.alt}
              loading="eager"
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </div>
      <div className="absolute top-[120rem] flex h-full w-full items-end justify-center space-x-5">
        {iconsListOne.map((icon, index) => (
          <div
            key={icon.alt}
            className={cn(
              "flex-center relative h-20 w-20 shrink-0 rounded-lg",
              index % 2 === 0 ? "animate-slidetop" : "animate-slidetop-slower"
            )}
          >
            <Icons.wrapper />
            <Image
              src={icon.src}
              alt={icon.alt}
              loading="eager"
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </div>
      <div
        style={{ backgroundImage: `url(${bg.src})` }}
        className="HeroAnimateIcons--bg"
      />
      <div className="HeroAnimateIcons--blur-left" />
      <div className="HeroAnimateIcons--blur-bottom" />
      <div className="HeroAnimateIcons--blur-right" />
    </div>
  );
};

export default HeroAnimateIcons;

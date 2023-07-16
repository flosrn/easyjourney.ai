"use client";

import React from "react";
import { toast, Toaster } from "react-hot-toast";

type NewsletterFormProps = {};

const NewsletterForm = ({}: NewsletterFormProps) => {
  return (
    <form className="mt-4 sm:flex sm:max-w-md">
      <label htmlFor="email-address" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        name="email-address"
        id="email-address"
        autoComplete="email"
        required
        className="w-full min-w-0 appearance-none rounded-md border border-transparent bg-white px-4 py-2 text-base text-gray-900 placeholder:text-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:placeholder:text-gray-400"
        placeholder="Enter your email"
      />
      <div className="mt-3 rounded-md sm:ml-3 sm:mt-0 sm:shrink-0">
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            toast("⚠️ Coming soon!");
          }}
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Subscribe
        </button>
      </div>
      <Toaster position="bottom-right" />
    </form>
  );
};

export default NewsletterForm;

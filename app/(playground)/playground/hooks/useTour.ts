import type React from "react";
import { useEffect } from "react";
import { driver } from "driver.js";

import { usePromptStore } from "../store/promptStore";
import { useTourStore } from "../store/tourStore";

// Type retourné par la fonction driver
type DriverInstance = ReturnType<typeof driver>;

type UseTourProps = {};

const useTour = ({}: UseTourProps): DriverInstance | null => {
  const [driverObj, setDriverObj, setIsTourActive] = useTourStore((state) => [
    state.driverObj,
    state.setDriverObj,
    state.setIsTourActive,
  ]);

  const setPromptValue = usePromptStore((state) => state.setPromptValue);

  useEffect(() => {
    if (localStorage.getItem("playground.tour")) {
      setIsTourActive(false);
      return;
    }

    const driverJs = driver({
      showProgress: true,
      steps: [
        {
          element: "#main-panel",
          popover: {
            title: "Welcome to the EasyJourney Playground",
            description:
              "Here is a quick tour to get you started with the easyjourney playground!",
            side: "left",
            align: "start",
          },
        },
        {
          element: "#prompt",
          popover: {
            title: "You can type your prompt here",
            description:
              "Type whatever you want and the AI will try to generate a poster based on your prompt.",
            side: "bottom",
            align: "start",
            onPopoverRender: (popover) => {
              const previousButton = popover.previousButton;
              const promptButton = document.createElement("button");
              promptButton.textContent = "Add a prompt";
              previousButton.after(promptButton);
              promptButton.addEventListener("click", () => {
                setPromptValue(
                  "Street style photography of a redhead woman going through New York City on a sunny day"
                );
                promptButton.remove();
              });
            },
          },
        },
        {
          element: "#aspect-ratio-selector",
          popover: {
            title: "You can change the aspect ratio of your poster",
            description:
              "Choose between 1:1, 4:3, 16:9 or 21:9, you can see the result in real time",
            side: "bottom",
            align: "start",
          },
        },
        {
          element: "#filter-selector",
          popover: {
            title: "You can add a lot of style filters to your poster",
            description:
              "Choose between a lot of filters, you can see the result in real time",
            side: "left",
            align: "start",
          },
        },
        {
          element: "div[data-value='most popular filters']",
          popover: {
            title: "Select 'Most popular filters' to see the most used filters",
            side: "left",
            align: "start",
          },
        },
        {
          element: "div[data-value='golden hour']",
          popover: {
            title: "Select 'Golden hour' to see the golden hour filter",
            side: "left",
            align: "start",
          },
        },
        {
          element: "img[alt='Golden Hour']",
          popover: {
            title: "This is the golden hour filter, click on it to apply it",
            side: "right",
            align: "start",
          },
        },
        {
          element: "#filter-badge",
          popover: {
            title:
              "Well done! You have applied your first filter, you can see it here",
            side: "right",
            align: "start",
          },
        },
        {
          element: "#advanced",
          popover: {
            title: "You can now click on 'Advanced' to see more options",
            side: "right",
            align: "start",
          },
        },
        {
          element: "#advanced-content",
          popover: {
            title: "You can now choose between a lot of advanced options",
            side: "right",
            align: "start",
          },
        },
        {
          element: "#imagine",
          popover: {
            title:
              "When you are ready, click on 'Imagine' to generate your first poster! ✨",
            side: "right",
            align: "start",
            onNextClick: (element, { step, state }) => {
              const imagineButton = document.querySelector(
                "#imagine"
              ) as HTMLButtonElement;
              imagineButton.click();
              // end tour
              state.destroy();
            },
          },
        },
      ],
      onDestroyed: () => {
        console.log("destroyed");
        // localStorage.setItem("playground.tour", "true");
        setIsTourActive(false);
      },
    });

    driverJs.drive();

    setDriverObj(driverJs);
    setIsTourActive(true);
  }, []);

  return driverObj;
};

export default useTour;

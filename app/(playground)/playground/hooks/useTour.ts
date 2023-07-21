import type React from "react";
import { useEffect } from "react";
import { driver } from "driver.js";
import JSConfetti from "js-confetti";

import { usePromptStore } from "../store/promptStore";
import { useTourStore } from "../store/tourStore";
import useGeneration from "./useGeneration";

const PROMPT =
  "Street style photography of a woman going through New York City";

// Type retourné par la fonction driver
type DriverInstance = ReturnType<typeof driver>;

type UseTourProps = {
  inputRef?: React.RefObject<HTMLTextAreaElement>;
};

const useTour = ({ inputRef }: UseTourProps): DriverInstance | null => {
  const [driverJs, setDriverJs, setIsTourActive] = useTourStore((state) => [
    state.driverJs,
    state.setDriverJs,
    state.setIsTourActive,
  ]);
  const [promptValue, setPromptValue] = usePromptStore((state) => [
    state.promptValue,
    state.setPromptValue,
  ]);
  const { handleImagineButtonClick } = useGeneration();

  useEffect(() => {
    if (localStorage.getItem("playground.tour")) {
      setIsTourActive(false);
      return;
    }

    const driverObj = driver({
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
              "Type whatever you want or click on 'Add prompt' to automatically add your first prompt.",
            side: "bottom",
            align: "start",
            onPopoverRender: (popover) => {
              const previousButton = popover.previousButton;
              const promptButton = document.createElement("button");
              promptButton.textContent = "Add prompt";
              previousButton.after(promptButton);
              promptButton.addEventListener("click", () => {
                setPromptValue(PROMPT);
                promptButton.remove();
              });
            },
            onNextClick: (element, step) => {
              const input = inputRef?.current;
              if (input && input.value.length === 0) {
                setPromptValue(PROMPT);
              }
              driverObj.moveNext();
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
            title:
              "Click on the style filter selector to see all filters by category",
            description:
              "Choose between a lot of filters, you can see the result in real time",
            side: "left",
            align: "start",
            disableButtons: ["next"],
          },
        },
        {
          element: "div[data-value='most popular filters']",
          popover: {
            title:
              "Select 'Most popular filters' category to see the most used filters",
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
            title: "Now click on 'Advanced' button to see more options",
            side: "right",
            align: "start",
            disableButtons: ["next"],
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
            onNextClick: () => {
              handleImagineButtonClick();
              driverObj.moveNext();
            },
          },
        },
        {
          element: "#waiting-poster",
          popover: {
            title:
              "Now you just have to wait a few seconds, your poster is coming! 🚀",
            side: "right",
            align: "start",
            nextBtnText: "Ok",
            onNextClick: () => {
              driverObj.destroy();
            },
          },
        },
        {
          element: ".swiper-slide-visible > #poster",
          popover: {
            title:
              "Your first poster generation is ready! You can select which one you want to upscale",
            description: "Select the one you want to upscale 🙂",
            side: "left",
            align: "start",
            disableButtons: ["next"],
          },
        },
        {
          element: "#upscale",
          popover: {
            title: "You can now click on 'Upscale' to upscale your poster",
            side: "top",
            align: "center",
            disableButtons: ["next"],
          },
        },
        {
          element: ".swiper-slide-visible > #poster",
          popover: {
            title: "Fantastic! Your poster is now upscaled! 🎉",
            side: "left",
            align: "start",
          },
        },
        {
          element: "#save-or-download",
          popover: {
            title: "You can now save or download your poster",
            description:
              "The save button will save your poster on your profile, you will be able to find it in the 'My profile' section",
            side: "top",
            align: "start",
          },
        },
        {
          element: "#more-options",
          popover: {
            title:
              "Now click on this button to see a lot of new options to customize your poster",
            description: "",
            side: "top",
            align: "start",
            disableButtons: ["next"],
          },
        },
        {
          element: "div[data-id='more-options']",
          popover: {
            title:
              "Discover many new options to customize your poster, enjoy! 🎉",
            description: "",
            side: "top",
            align: "start",
          },
        },
        {
          element: "#ok",
          popover: {
            title:
              "That's it! You are now ready to create your own posters so easily! 🚀",
            description: "",
            side: "over",
            align: "center",
            onPopoverRender: async (popover) => {
              const jsConfetti = new JSConfetti();
              await jsConfetti.addConfetti();
            },
          },
        },
      ],
      // onNextClick: (element, step, { config, state }) => {
      //   console.log("onNextClick");
      //   console.log("state :", state);
      //   // setActiveStep(step.index);
      //   driverObj.moveNext();
      // },
      onCloseClick: () => {
        console.log("onCloseClick");
        driverObj.destroy();
      },
      onDestroyStarted: (element, step, { config, state }) => {
        console.log("onDestroyStarted");
        console.log("step :", step);
        console.log("state :", state);
        const currentStep = step.element;
        const isWaitingPosterStep = currentStep === "#waiting-poster";
        const isPromptStep = currentStep === "#prompt";
        const isImagineStep = currentStep === "#imagine";
        if (isWaitingPosterStep) {
          driverObj.destroy();
          return;
        }
        if (isPromptStep) {
          const input = inputRef?.current;
          if (input && input.value.length === 0) {
            setPromptValue(PROMPT);
          }
        }
        if (isImagineStep) {
          handleImagineButtonClick();
        }
        if (driverObj.hasNextStep()) {
          driverObj.moveNext();
        } else {
          driverObj.destroy();
        }
        // if (!driverJs.hasNextStep() || confirm("Are you sure?")) {
        //   driverJs.destroy();
        // }
      },
      // onDestroyed: () => {
      //   console.log("onDestroyed");
      //   // driverObj.destroy();
      //   // console.log("driverObj :", driverObj);
      //   // driverObj.moveNext();
      //   // localStorage.setItem("playground.tour", "true");
      //   // setIsTourActive(false);
      // },
    });

    driverObj.drive();

    setDriverJs(driverObj);
    setIsTourActive(true);
  }, []);

  return driverJs;
};

export default useTour;

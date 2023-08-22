import type React from "react";
import { useEffect } from "react";
import wait from "~/utils/wait";
import { driver } from "driver.js";
import JSConfetti from "js-confetti";
import type { User } from "next-auth";

import { usePromptStore } from "../store/promptStore";
import { useTutorialStore } from "../store/tutorialStore";
import useGeneration from "./useGeneration";

const PROMPT =
  "Street style photography of a woman going through New York City";

// Type retourné par la fonction driver
type DriverInstance = ReturnType<typeof driver>;

type UseTourProps = {
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  status?: string;
};

const useTutorial = ({
  inputRef,
  status,
}: UseTourProps): DriverInstance | null => {
  const [driverJs, setDriverJs, setIsTutorialEnabled] = useTutorialStore(
    (state) => [state.driverJs, state.setDriverJs, state.setIsTutorialEnabled]
  );
  const [promptValue, setPromptValue] = usePromptStore((state) => [
    state.promptValue,
    state.setPromptValue,
  ]);
  const { handleImagineButtonClick } = useGeneration();

  useEffect(() => {
    if (status === "unauthenticated") return;
    const localTutorial = localStorage.getItem("tutorial");
    if (localTutorial === "false") {
      setIsTutorialEnabled(false);
      return;
    }
    if (localTutorial === "true") {
      setIsTutorialEnabled(true);
    }
    if (localTutorial === null) {
      setIsTutorialEnabled(true);
    }

    const driverObj = driver({
      showProgress: false,
      smoothScroll: true,
      prevBtnText: "← Back",
      steps: [
        {
          element: "#demo",
          popover: {
            title: "EasyJourney Tutorial ✨",
            description:
              "Do you want to discover all the possibilities of EasyJourney? <strong>Click on Yes</strong> to start the tutorial.",
            side: "over",
            align: "center",
            nextBtnText: "Yes!",
            prevBtnText: "No, thanks",
            showButtons: ["next"],
            onPopoverRender: (popover, { config, state }) => {
              const customButton = document.createElement(
                "button"
              ) as HTMLButtonElement;
              customButton.innerHTML = "No, thanks";
              popover.nextButton.before(customButton);
              customButton.addEventListener("click", () => {
                driverObj.destroy();
                setIsTutorialEnabled(false);
                localStorage.setItem("tutorial", "false");
              });
            },
          },
        },
        {
          element: "#main-panel",
          popover: {
            title: "Playground area 🎨",
            description: "This is where your images will be generated.",
            side: "left",
            align: "start",
          },
        },
        {
          element: "#prompt",
          popover: {
            title: "Prompt area ✍️",
            description:
              "Type whatever you want or go next to automatically add your first prompt.",
            side: "bottom",
            align: "start",
            onNextClick: async (element, step, { config, state }) => {
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
            title: "Aspect Ratio area 🖼️",
            description:
              "Choose between a lot of aspect ratios between portrait, landscape and square.",
            side: "right",
            align: "center",
          },
        },
        {
          element: "#filter-selector",
          popover: {
            title: "Style filter selector 🖌️",
            description:
              "Choose between more than +5000 filters to apply on your poster.",
            side: "right",
            align: "center",
            disableButtons: ["next"],
          },
        },
        {
          element: "#filter-badge",
          popover: {
            title: "Filter badge 👌",
            description: "Well done! You have applied your first filter.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#imagine",
          popover: {
            title: "3, 2, 1... Generate! 🪄",
            description:
              "Now, <strong>click on Generate</strong> to see magic happen!",
            side: "right",
            align: "start",
            disableButtons: ["next"],
            onNextClick: () => {
              handleImagineButtonClick();
              driverObj.destroy();
            },
          },
        },
        {
          element: ".swiper-slide-visible > #poster-imagine",
          popover: {
            title: "This is your poster grid! 💪",
            description:
              "<strong>Select the poster</strong> you want to upscale",
            side: "left",
            align: "start",
            disableButtons: ["next"],
          },
        },
        {
          element: "#upscale",
          popover: {
            title: "Upscale button 🆙",
            description: "Now, <strong>click on Upscale</strong>",
            side: "top",
            align: "start",
            disableButtons: ["next"],
          },
        },
        {
          element: ".swiper-slide-visible > #poster-upscale",
          popover: {
            title: "This is your first upscaled poster! 🎉",
            side: "left",
            align: "start",
          },
        },
        {
          element: "#save-or-download",
          popover: {
            title: "Save or download your poster 📥",
            description:
              "Save your poster in your gallery or download it on your computer.",
            side: "top",
            align: "start",
          },
        },
        {
          element: "#slider-arrows",
          popover: {
            title: "Switch area ⬅️ ➡️",
            description:
              "You can <strong>click on the left</strong> or right arrow to switch between all your generations.",
            side: "left",
            align: "end",
            onNextClick: async (element, step, { config, state }) => {
              console.log("element :", element);
              console.log("step :", step);
              console.log("config :", config);
              console.log("state :", state);
              const currentIndex = state.activeIndex;
              driverObj.destroy();
              await wait(1500);
              currentIndex && driverObj.drive(currentIndex + 2);
              // driverJs?.drive(9);
            },
          },
        },
        {
          element: "#slider-arrows",
          popover: {
            title: "Go back to the upscaled poster ➡️",
            side: "right",
            align: "end",
            disableButtons: ["next"],
          },
        },
        {
          element: "#more-options",
          popover: {
            title: "More options button ⚙️",
            description:
              "<strong>Click on this button</strong> to discover many more possibilities!",
            side: "top",
            align: "start",
            disableButtons: ["next"],
          },
        },
        {
          element: "div[data-id='more-options']",
          popover: {
            title: "More options menu 📝",
            description:
              "You can choose between <strong>Zoom</strong>, <strong>Pan</strong>, and <strong>Vary</strong> options.",
            side: "top",
            align: "end",
            onNextClick: async (element, step, { config, state }) => {
              const currentIndex = state.activeIndex;
              driverObj.destroy();
              await wait(1500);
              currentIndex && driverObj.drive(currentIndex + 1);
            },
          },
        },
        {
          element: "#final",
          popover: {
            title: "Here we go! 🚀",
            description:
              "You have discovered the main possibilities of EasyJourney. Now, enjoy your journey and let's create!",
            side: "over",
            align: "center",
            onPopoverRender: async () => {
              const jsConfetti = new JSConfetti();
              await wait(1000);
              await jsConfetti.addConfetti();
              setIsTutorialEnabled(false);
              localStorage.setItem("tutorial", "false");
            },
          },
        },
      ],
      onNextClick: (element, step, { config, state }) => {
        console.log("onNextClick");
        if (step.popover?.disableButtons?.includes("next")) return;
        // const currentStep = step.element;
        // const isMoreOptionsStep = currentStep === "div[data-id='more-options']";
        // if (isMoreOptionsStep) {
        //   driverJs?.destroy();
        //   const tourSteps = driverJs?.getConfig().steps;
        //   const stepIndex = tourSteps?.findIndex(
        //     (tourStep) => tourStep.element === "#final"
        //   );
        //   setTimeout(() => {
        //     driverJs?.drive(stepIndex);
        //   }, 2000);
        // }
        driverObj.moveNext();
      },
      onCloseClick: () => {
        console.log("onCloseClick");
        driverObj.destroy();
        setIsTutorialEnabled(false);
        localStorage.setItem("tutorial", "false");
      },
      onDestroyStarted: (element, step, { config, state }) => {
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
      //   localStorage.setItem("playground.tour", "true");
      //   setIsTourActive(false);
      // },
    });

    driverObj.drive();

    setDriverJs(driverObj);
  }, []);

  return driverJs;
};

export default useTutorial;

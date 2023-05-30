import type { Filter } from "../../../../types/typeFilters";

export const phaseTransitionsFilters: Filter[] = [
  {
    id: "Melting_6_3_1",
    name: "Melting",
    description: "Transform from solid to liquid state through melting.",
    style: "Melting",
    image: "/images/filters/Melting.webp",
    isSelected: false,
  },
  {
    id: "Freezing_6_3_2",
    name: "Freezing",
    description: "Transition from liquid to solid state through freezing.",
    style: "Freezing",
    image: "/images/filters/Freezing.webp",
    isSelected: false,
  },
  {
    id: "Vaporization_6_9_1",
    name: "Vaporization",
    description: "Convert from liquid to gaseous state through vaporization.",
    style: "Vaporization",
    image: "/images/filters/Vaporization.webp",
    isSelected: false,
  },
  {
    id: "Condensation_6_9_2",
    name: "Condensation",
    description: "Transition from gas to liquid state through condensation.",
    style: "Condensation",
    image: "/images/filters/Condensation.webp",
    isSelected: false,
  },
  {
    id: "Sublimation_6_15_1",
    name: "Sublimation",
    description:
      "Direct transformation from solid to gas state through sublimation.",
    style: "Sublimation",
    image: "/images/filters/Sublimation.webp",
    isSelected: false,
  },
  {
    id: "Deposition_6_15_2",
    name: "Deposition",
    description:
      "Direct transformation from gas to solid state through deposition.",
    style: "Deposition",
    image: "/images/filters/Deposition.webp",
    isSelected: false,
  },
  {
    id: "Ionization_6_21_1",
    name: "Ionization",
    description: "Convert atoms or molecules into ions through ionization.",
    style: "Ionization",
    image: "/images/filters/Ionization.webp",
    isSelected: false,
  },
  {
    id: "Deionization_6_21_2",
    name: "Deionization",
    description: "Remove ions from a solution through deionization.",
    style: "Deionization",
    image: "/images/filters/Deionization.webp",
    isSelected: false,
  },
];

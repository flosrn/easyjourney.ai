import type { SubCategoryFilter } from "../../../types/typeFilters";
import { ambiguousObjectsFilters } from "./subCategories/ambiguousObjects";
import { badgesPatchesandTrophiesFilters } from "./subCategories/badgesPatchesandTrophies";
import { beveragesFilters } from "./subCategories/beverages";
import { breadFilters } from "./subCategories/bread";
import { candyandSweetsFilters } from "./subCategories/candyandSweets";
import { clothingFilters } from "./subCategories/clothing";
import { digitalObjectsFilters } from "./subCategories/digitalObjects";
import { dishesandMealsFilters } from "./subCategories/dishesandMeals";
import { fruitsandVegetablesFilters } from "./subCategories/fruitsandVegetables";
import { goodLuckCharmsFilters } from "./subCategories/goodLuckCharms";
import { herbsandSpicesFilters } from "./subCategories/herbsandSpices";
import { instrumentsFilters } from "./subCategories/instruments";
import { meatsCheesesandEggsFilters } from "./subCategories/meatsCheesesandEggs";
import { microscopicObjectsFilters } from "./subCategories/microscopicObjects";
import { nutsandBeansFilters } from "./subCategories/nutsandBeans";
import { otherFoodandConsumablesFilters } from "./subCategories/otherFoodandConsumables";
import { otherObjectsFilters } from "./subCategories/otherObjects";
import { saucesSpreadsandOilsFilters } from "./subCategories/saucesSpreadsandOils";
import { toysFilters } from "./subCategories/toys";
import { vehiclesFilters } from "./subCategories/vehicles";

export const objectsFilters: SubCategoryFilter[] = [
  {
    id: "fruitsandVegetables_2",
    icon: "🍣🥝",
    name: "Fruits and Vegetables",
    options: fruitsandVegetablesFilters,
  },
  {
    id: "meatsCheesesandEggs_3",
    icon: "🍣🥩",
    name: "Meats, Cheeses and Eggs",
    options: meatsCheesesandEggsFilters,
  },
  {
    id: "bread_4",
    icon: "🍣🍞",
    name: "Bread",
    options: breadFilters,
  },
  {
    id: "nutsandBeans_5",
    icon: "🍣🥜",
    name: "Nuts and Beans",
    options: nutsandBeansFilters,
  },
  {
    id: "dishesandMeals_6",
    icon: "🍣🍲",
    name: "Dishes and Meals",
    options: dishesandMealsFilters,
  },
  {
    id: "saucesSpreadsandOils_7",
    icon: "🍣🥫",
    name: "Sauces, Spreads and Oils",
    options: saucesSpreadsandOilsFilters,
  },
  {
    id: "herbsandSpices_8",
    icon: "🍣🌿",
    name: "Herbs and Spices",
    options: herbsandSpicesFilters,
  },
  {
    id: "candyandSweets_9",
    icon: "🍣🍭",
    name: "Candy and Sweets",
    options: candyandSweetsFilters,
  },
  {
    id: "beverages_10",
    icon: "🍣🍺",
    name: "Beverages",
    options: beveragesFilters,
  },
  {
    id: "otherFoodandConsumables_11",
    icon: "🍣",
    name: "Other Food and Consumables",
    options: otherFoodandConsumablesFilters,
  },
  {
    id: "microscopicObjects_12",
    icon: "🎷🦠",
    name: "Microscopic Objects",
    options: microscopicObjectsFilters,
  },
  {
    id: "digitalObjects_13",
    icon: "🎷🖥",
    name: "Digital Objects",
    options: digitalObjectsFilters,
  },
  {
    id: "toys_14",
    icon: "🎷🪀",
    name: "Toys",
    options: toysFilters,
  },
  {
    id: "clothing_15",
    icon: "🎷👚",
    name: "Clothing",
    options: clothingFilters,
  },
  {
    id: "instruments_16",
    icon: "🎷🎺",
    name: "Instruments",
    options: instrumentsFilters,
  },
  {
    id: "vehicles_17",
    icon: "🎷🚗",
    name: "Vehicles",
    options: vehiclesFilters,
  },
  {
    id: "goodLuckCharms_18",
    icon: "🎷🍀",
    name: "Good Luck Charms",
    options: goodLuckCharmsFilters,
  },
  {
    id: "badgesPatchesandTrophies_19",
    icon: "🎷🏆",
    name: "Badges, Patches and Trophies",
    options: badgesPatchesandTrophiesFilters,
  },
  {
    id: "ambiguousObjects_20",
    icon: "🎷⚜",
    name: "Ambiguous Objects",
    options: ambiguousObjectsFilters,
  },
  {
    id: "otherObjects_21",
    icon: "🎷🚽",
    name: "Other Objects",
    options: otherObjectsFilters,
  },
];

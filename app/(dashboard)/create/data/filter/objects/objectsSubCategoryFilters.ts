import type { SubCategoryFilter } from "../typeFilters";
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
    icon: "🍣",
    name: "FruitsandVegetables",
    options: fruitsandVegetablesFilters,
  },
  {
    id: "meatsCheesesandEggs_3",
    icon: "🍣",
    name: "Meats,Cheeses,andEggs",
    options: meatsCheesesandEggsFilters,
  },
  {
    id: "bread_4",
    icon: "🍣",
    name: "Bread",
    options: breadFilters,
  },
  {
    id: "nutsandBeans_5",
    icon: "🍣",
    name: "NutsandBeans",
    options: nutsandBeansFilters,
  },
  {
    id: "dishesandMeals_6",
    icon: "🍣",
    name: "DishesandMeals",
    options: dishesandMealsFilters,
  },
  {
    id: "saucesSpreadsandOils_7",
    icon: "🍣",
    name: "Sauces,Spreads,andOils",
    options: saucesSpreadsandOilsFilters,
  },
  {
    id: "herbsandSpices_8",
    icon: "🍣",
    name: "HerbsandSpices",
    options: herbsandSpicesFilters,
  },
  {
    id: "candyandSweets_9",
    icon: "🍣",
    name: "CandyandSweets",
    options: candyandSweetsFilters,
  },
  {
    id: "beverages_10",
    icon: "🍣",
    name: "Beverages",
    options: beveragesFilters,
  },
  {
    id: "otherFoodandConsumables_11",
    icon: "🍣",
    name: "OtherFoodandConsumables",
    options: otherFoodandConsumablesFilters,
  },
  {
    id: "microscopicObjects_12",
    icon: "🎷",
    name: "MicroscopicObjects",
    options: microscopicObjectsFilters,
  },
  {
    id: "digitalObjects_13",
    icon: "🎷",
    name: "DigitalObjects",
    options: digitalObjectsFilters,
  },
  {
    id: "toys_14",
    icon: "🎷",
    name: "Toys",
    options: toysFilters,
  },
  {
    id: "clothing_15",
    icon: "🎷",
    name: "Clothing",
    options: clothingFilters,
  },
  {
    id: "instruments_16",
    icon: "🎷",
    name: "Instruments",
    options: instrumentsFilters,
  },
  {
    id: "vehicles_17",
    icon: "🎷",
    name: "Vehicles",
    options: vehiclesFilters,
  },
  {
    id: "goodLuckCharms_18",
    icon: "🎷",
    name: "GoodLuckCharms",
    options: goodLuckCharmsFilters,
  },
  {
    id: "badgesPatchesandTrophies_19",
    icon: "🎷",
    name: "Badges,Patches,andTrophies",
    options: badgesPatchesandTrophiesFilters,
  },
  {
    id: "ambiguousObjects_20",
    icon: "🎷",
    name: "AmbiguousObjects",
    options: ambiguousObjectsFilters,
  },
  {
    id: "otherObjects_21",
    icon: "🎷",
    name: "OtherObjects",
    options: otherObjectsFilters,
  },
];

import { Currency } from "@lib/models";

export const currencyList: Currency[] = [
  Currency.JPY,
  Currency.TWD,
  Currency.USD,
];

export const thumbnailList: IconName[] = [
  "home",
  "train",
  "travel",
  "gas-meter",
  "water-drop",
  "bolt",
  "shopping-cart",
  "stadia-controller",
] as const;

export const formatAmountForDisplay = (
  amount: number,
  currency: string
): string => {
  const numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  });
  return numberFormat.format(amount);
};

export const formatAmountForStripe = (
  amount: number,
  currency: string
): number => {
  const numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (const part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
};

export const formatAmountFromStripe = (
  amount: number,
  currency: string
): number => {
  const numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (const part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount / 100);
};

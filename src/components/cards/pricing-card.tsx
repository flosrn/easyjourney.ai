import * as React from "react";
import { CheckCircle2Icon } from "lucide-react";

import PricingCardButton from "~/components/cards/pricing-card-button";
import { Badge } from "~/components/ui/badge";

import { cn } from "~/lib/classNames";

export default function PricingCard({
  title,
  plan,
  price,
  description,
  features,
  disabled,
}: {
  title: string;
  plan: string;
  price: string;
  description: string;
  features: React.JSX.Element[];
  disabled?: boolean;
}) {
  const isPro = plan === "PRO";
  const isUltimate = plan === "ULTIMATE";
  return (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-xl border-2 p-8",
        {
          "opacity-50 cursor-not-allowed": disabled,
        }
      )}
    >
      {isUltimate && (
        <div className="absolute right-2 top-1">
          <Badge variant="outline">Coming soon</Badge>
        </div>
      )}
      <h2
        className={cn("mb-2 text-xl font-bold", {
          "font-black animate-text text-gradient-hyper": isPro,
        })}
      >
        {title}
      </h2>
      <span className="text-3xl font-extrabold">{price}</span>
      <span className="w-full border-b-2 border-stone-200 pb-4 text-center text-sm">
        {description}
      </span>
      <div className="mb-5 flex h-full w-full justify-normal pt-4 text-left">
        <ul>
          {features.map((feature) => {
            const isLast = feature.key === features.at(-1)?.key;
            const isFeatureNotAvailable = feature.props.datatype === "soon";
            const isDisabled = (isLast && isPro) || isFeatureNotAvailable;
            const disabledColor = { "text-muted-foreground/50": isDisabled };
            return (
              <li key={feature.key} className="my-2 flex leading-5">
                <span>
                  <CheckCircle2Icon
                    className={cn("mr-2 h-5 w-5", disabledColor, {
                      "text-green-400": isPro,
                    })}
                  />
                </span>
                <span className={cn("flex items-center", disabledColor)}>
                  {feature}
                  {isFeatureNotAvailable && (
                    <Badge
                      variant="outline"
                      className={cn("ml-2 h-5", disabledColor)}
                    >
                      Soon
                    </Badge>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      {plan !== "FREE" && <PricingCardButton disabled={disabled} />}
    </div>
  );
}

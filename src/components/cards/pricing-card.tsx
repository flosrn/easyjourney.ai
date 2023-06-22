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
  const isElite = plan === "ELITE";
  return (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-xl border-2 p-8",
        {
          "opacity-50 cursor-not-allowed": disabled,
        }
      )}
    >
      {isElite && (
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
      <div className="flex h-full w-full justify-normal pt-4 text-left">
        <ul>
          {features.map((feature) => {
            const isLast = feature.key === features.at(-1)?.key;
            return (
              <li key={feature.key} className="my-2 flex leading-5">
                <span>
                  <CheckCircle2Icon
                    className={cn("mr-2 h-5 w-5", {
                      "text-green-400": isPro,
                      "text-muted-foreground/50": isLast && isPro,
                    })}
                  />
                </span>
                <span
                  className={cn({
                    "text-muted-foreground/50": isLast && isPro,
                  })}
                >
                  {feature}
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

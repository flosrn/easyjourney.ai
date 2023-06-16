import { Button, buttonVariants } from "~/components/ui/button";

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
  features: string[];
  disabled?: boolean;
}) {
  return (
    <div
      className={cn("flex flex-col items-center rounded-xl border-2 p-8", {
        "opacity-50 cursor-not-allowed": disabled,
      })}
    >
      <h2 className="mb-2 text-xl font-light">{title}</h2>
      <span className="text-3xl font-extrabold">{price}</span>
      <span className="w-full border-b-2 border-stone-200 pb-4 text-center text-sm">
        {description}
      </span>
      <div className="flex h-full w-full justify-normal pt-4 text-left">
        <ul>
          {features.map((feature: string) => (
            <li key={feature} className="my-2 flex leading-5">
              <span className="">
                <svg
                  fill="none"
                  height="16"
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
              <p>{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      {plan !== "FREE" && (
        <Button
          className={cn(buttonVariants({ variant: "default", size: "lg" }), {
            "pointer-events-none": disabled,
          })}
        >
          Choose this plan
        </Button>
      )}
    </div>
  );
}

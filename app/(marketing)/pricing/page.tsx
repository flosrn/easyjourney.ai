import PricingCard from "~/components/cards/pricing-card";

const pricingData = [
  {
    title: "Free",
    price: "$0",
    description: "For small teams or hobby projects",
    features: ["Up to 5 users", "Basic support", "All core features"],
  },
  {
    title: "Pro",
    price: "$15",
    description: "Most popular choice",
    features: [
      "Up to 20 users",
      "Priority email support",
      "All core features",
      "Enhanced security",
    ],
  },
  {
    title: "Enterprise",
    price: "$30",
    description: "For large teams or enterprises",
    features: [
      "Unlimited users",
      "Phone & email support",
      "All core features",
      "Enhanced security",
      "Custom integrations",
      "double line checked if this is very long then what will happen ? Will this bug ? Will this broke ? I don't know",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="flex-center mt-6 flex flex-col">
      <h2 className="text-xl font-light uppercase tracking-wider ">Pricing</h2>
      <span className="mt-6 text-4xl font-extrabold ">
        Choose the way you make Art
      </span>
      <div className="mx-auto grid max-w-screen-lg gap-4 px-5 py-10 md:grid-cols-2 lg:grid-cols-3">
        {pricingData.map((pricing) => (
          <PricingCard key={pricing.title} {...pricing} />
        ))}
      </div>
    </div>
  );
}

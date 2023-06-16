import PricingCard from "~/components/cards/pricing-card";

const pricingData = [
  {
    title: "Free",
    plan: "FREE",
    price: "$0",
    description: "For newbies users of Midjourney",
    features: [
      "Generate 5 posters per day",
      "Generate posters in relaxed mode",
      "Create up to 2 boards",
      "Basic support",
    ],
  },
  {
    title: "Pro",
    plan: "PRO",
    price: "$10",
    description: "For regular users of Midjourney",
    features: [
      "Generate 50 posters per day",
      "Generate posters in fast mode",
      "Create unlimited boards",
      "Private posters",
      "Private boards",
      "Collaborative boards",
      "Priority support",
    ],
  },
  {
    title: "Elite",
    plan: "ELITE",
    price: "$30",
    description: "For large teams or enterprises",
    features: ["Soon"],
    disabled: true,
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

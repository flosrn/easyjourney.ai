import PricingCard from "~/components/cards/pricing-card";

const pricingData = [
  {
    title: "Free",
    plan: "FREE",
    price: "$0",
    description: "For newbies users of Midjourney",
    features: [
      <p key="0">
        Generate <strong>5</strong> posters per day
      </p>,
      <p key="1">
        Generate posters in <strong>relaxed mode</strong>
      </p>,
      <p key="2">
        Create up to <strong>2</strong> boards
      </p>,
      <p key="3">Basic support</p>,
    ],
  },
  {
    title: "Pro",
    plan: "PRO",
    price: "$10",
    description: "For regular users of Midjourney",
    features: [
      <p key="0">
        Generate{" "}
        <strong className="text-gradient-hyper animate-text">500</strong>{" "}
        posters per month
      </p>,
      <p key="1">
        Generate posters in{" "}
        <strong className="text-gradient-hyper animate-text">fast mode</strong>
      </p>,
      <p key="2">
        Create up to <strong>5</strong> boards
      </p>,
      <p key="4">Private posters</p>,
      <p key="5">Private boards</p>,
      <p key="6">Priority support</p>,
      <p key="3" datatype="soon">
        Collaborative boards up to <strong>3</strong> members
      </p>,
      <p key="7">More coming soon...</p>,
    ],
  },
  {
    title: "Ultimate",
    plan: "ULTIMATE",
    price: "$30",
    description: "For power users of Midjourney",
    features: [
      <p key="0">
        Generate <strong>2000</strong> posters per month
      </p>,
      <p key="1">
        Generate posters in <strong>fast mode</strong>
      </p>,
      <p key="2">
        Create <strong>unlimited</strong> boards
      </p>,
      <p key="3">
        Collaborative boards with <strong>unlimited members</strong>
      </p>,
      <p key="4">Private posters</p>,
      <p key="5">Private boards</p>,
      <p key="6">
        Generate posters with <strong>AI</strong>
      </p>,
      <p key="7">More coming soon...</p>,
    ],
    disabled: true,
  },
];

export default function PricingPage() {
  return (
    <div className="flex-center container mt-10 flex flex-col">
      <h2 className="text-xl font-light uppercase tracking-wider">Pricing</h2>
      <span className="mt-6 text-center text-4xl font-extrabold ">
        Choose the way you want to make art
      </span>
      <div className="mx-auto grid max-w-screen-lg gap-4 py-10 md:grid-cols-2 lg:grid-cols-3">
        {pricingData.map((pricing) => (
          <PricingCard key={pricing.title} {...pricing} />
        ))}
      </div>
    </div>
  );
}

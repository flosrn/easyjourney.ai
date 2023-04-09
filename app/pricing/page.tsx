
const pricingData = [
  {title: 'Free', price: '$0', description: 'For small teams or hobby projects', features: ['Up to 5 users', 'Basic support', 'All core features']},
  {title: 'Pro', price: '$15', description: 'Most popular choice', features: ['Up to 20 users', 'Priority email support', 'All core features', 'Enhanced security']},
  {title: 'Enterprise', price: '$30', description: 'For large teams or enterprises', features: ['Unlimited users', 'Phone & email support', 'All core features', 'Enhanced security', 'Custom integrations', `double line checked if this is very long then what will happen ? Will this bug ? Will this broke ? I don't know`]}
];

export default function PricingPage() {
  return (
    <>
      <div className="flex-col flex-center mt-6">
      <h2 className="uppercase font-light text-xl tracking-wider">Pricing</h2>
      <span className="text-4xl font-extrabold mt-6">Choose the way you make Art</span>
      </div>
    </>
  );
}

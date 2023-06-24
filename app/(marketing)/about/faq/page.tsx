import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const accordionData = [
  {
    value: "item-1",
    trigger: "Is it free ? ",
    content: "Yes, you can use it for free to test it, but with limitations.",
  },
  {
    value: "item-2",
    trigger: "What does the free version offer?",
    content: "The free version allows you to generate up to 5 images per day.",
  },
  {
    value: "item-4",
    trigger: "What do the paid plans offer?",
    content:
      "Our paid plans provide unrestricted access to our services, with the limit of posters included in your plan during one month. You can use all your credit  without any daily restrictions. The credit restores itself each month according to the plan you choose.",
  },
  {
    value: "item-13",
    trigger: "How do I upgrade my plan?",
    content:
      "You can upgrade your plan from your account settings page. If you encounter any issues, please contact our support team.",
  },
  {
    value: "item-14",
    trigger: "Can I downgrade my plan?",
    content:
      "Yes, you can downgrade your plan from your account settings page. Please note that downgrading your plan will change the features available to you.",
  },
  {
    value: "item-16",
    trigger: "How do I cancel my subscription?",
    content:
      "You can cancel your subscription from your account settings page. Once cancelled, your plan will not renew at the end of your billing cycle.",
  },
  {
    value: "item-9",
    trigger: "Do the paid plans have any long-term commitment?",
    content: "No. You can cancel your subscription at any time.",
  },
  {
    value: "item-15",
    trigger: "What payment methods do you accept?",
    content:
      "We accept various payment methods including credit cards, debit cards, and PayPal. For more information, please refer to our payment options page.",
  },
  {
    value: "item-5",
    trigger: "How often does the credit restore?",
    content:
      "Your credit will be restored each month, the amount will be set according to your chosen plan.",
  },

  {
    value: "item-17",
    trigger: "Do you offer any discounts for annual subscriptions?",
    content:
      "Not at this time. Feel free to contact us if you have any questions about this particular subject.",
  },
  {
    value: "item-3",
    trigger: "What happens when midJourney is updated?",
    content:
      "We strive to update our website as soon as possible when midJourney releases updates. However, this may cause temporary bugs or glitches. Most of them are fixed within a few hours.",
  },

  {
    value: "item-6",
    trigger: "What should I do if I encounter a bug?",
    content:
      "Please report any issues you encounter through our contact page. We're continually working to improve our services and appreciate your feedback.",
  },
  {
    value: "item-8",
    trigger: "How can I contact support?",
    content:
      "You can reach our support team through the contact page on our website.",
  },

  {
    value: "item-10",
    trigger: "Is my data secure?",
    content:
      "Yes. We prioritize the privacy and security of your data. All information is stored and processed in accordance with our privacy policy.",
  },
  {
    value: "item-12",
    trigger: "Are there any limitations on the type of images I can ?",
    content:
      "Yes, the limitations are based on openAI Moderation. Posters depicting sexual, gore, brutal, self-harm, harassmennt or illegal content are prohibited. ",
  },

  {
    value: "item-18",
    trigger: "Can I use this service on multiple devices?",
    content:
      "Yes, you can access our service from any device with an internet connection, using your login credentials.",
  },
];

export default function faqPage() {
  return (
    <>
      <div className="container">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-4xl font-bold">
            Frequently Asked Questions
          </h1>
        </div>
      </div>
      <div className="container">
        <div className="max-w-screen-xl">
          {accordionData.map((item) => {
            return (
              <Accordion type="multiple" key={item.value} collapsible>
                <AccordionItem value={item.value}>
                  <AccordionTrigger classname="">
                    {item.trigger}
                  </AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      </div>
    </>
  );
}

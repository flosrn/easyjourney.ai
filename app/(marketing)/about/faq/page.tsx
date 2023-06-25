import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const accordionData = [
  {
    value: "item-1",
    trigger: 'How does "credits" work ?',
    content:
      "Credit is the number of posters you can generate. Each poster you generate will use up one credit. The credit restores itself each month or day according to the plan you choose. In PRO plan you are not limited by daily generation and can use all your credits at once.",
  },
  {
    value: "item-2",
    trigger: "Is the website is in Beta ?",
    content:
      "Yes, the website is in Beta and is still under development, so you may encounter some bugs or glitches, potentially when a new Midjourney update is released. Please report any issues you encounter through our Discord server. We're continually working to improve our services and we appreciate your feedback. Beta also means there is so much more to come and more features will be added soon, so stay tuned!",
  },
  {
    value: "item-3",
    trigger: "Are there any limitations on the type of images I can generate ?",
    content:
      "Posters depicting sexual, gore, brutal, self-harm, harassment or illegal content are prohibited.",
  },
  {
    value: "item-4",
    trigger: "Can I use the generated images for commercial use ?",
    content:
      "The paid plan allows you to use the generated images for commercial use. The free plan allows you to use the generated images for personal use only.",
  },
];

export default function faqPage() {
  return (
    <>
      <div className="container my-12">
        <div className="mx-auto max-w-2xl">
          <div className="my-4 flex flex-col items-center justify-center">
            <h1 className="text-center text-4xl font-bold">
              Frequently Asked Questions
            </h1>
          </div>
          {accordionData.map((item) => {
            return (
              <Accordion key={item.value} type="single" collapsible>
                <AccordionItem value={item.value}>
                  <AccordionTrigger className="text-left">
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

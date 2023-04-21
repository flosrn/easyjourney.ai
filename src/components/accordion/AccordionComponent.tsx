import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export default function AccordionComponent() {
  return (
    <Accordion.Root
      className=" w-full border-t border-white "
      type="multiple"
      collapsible="true"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          En combien de temps recevrais-je mon poster ?
        </AccordionTrigger>

        <AccordionContent>
          Votre poster devrait arriver dans les 3 à 5 jours ouvrables.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can it be animated?</AccordionTrigger>
        <AccordionContent>
          Yes! You can animate the Accordion with CSS or JavaScript.
        </AccordionContent>
      </AccordionItem>
    </Accordion.Root>
  );
}

const AccordionItem = ({ children, ...props }) => {
  return (
    <Accordion.Item
      className="w-full overflow-hidden border-b border-white"
      {...props}
    >
      {children}
    </Accordion.Item>
  );
};

const AccordionTrigger = ({ children, ...props }) => {
  return (
    <>
      <Accordion.Header className="md:flex">
        <Accordion.Trigger
          className="mx-4 w-full py-8 text-center text-lg font-bold md:flex md:justify-between md:text-left"
          {...props}
        >
          {children}
          <ChevronDownIcon
            className=" ease-[cubic-bezier(0.87,_0,_0.13,_1) hidden transition-transform duration-300 group-data-[state=open]:rotate-180 md:block"
            aria-hidden
          />
        </Accordion.Trigger>
      </Accordion.Header>
    </>
  );
};

const AccordionContent = ({ children, ...props }) => {
  return (
    <Accordion.Content
      className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp mx-4 pb-8 text-center leading-5 md:text-left"
      {...props}
    >
      {children}
    </Accordion.Content>
  );
};

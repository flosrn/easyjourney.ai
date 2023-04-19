import * as Accordion from "@radix-ui/react-accordion";

export default function AccordionComponent() {
  return (
    <Accordion.Root
      className="w-full rounded-md"
      type="single"
      defaultValue="item-1"
    >
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger>
            En combien de temps recevrais je mon poster ?
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>C'est cela </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

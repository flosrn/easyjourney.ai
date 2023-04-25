import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/Accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/Tabs";

const posterDetailsData = [
  {
    src: "/images/icons/artist.png",
    alt: "logo artist",
    text: "Chaque poster vendu soutient un artiste",
  },
  {
    src: "/images/icons/certificate.png",
    alt: "logo certificat",
    text: "Poster de qualité ",
  },
  {
    src: "/images/icons/environment.png",
    alt: "logo environement",
    text: "Notre processus d'impression est respectueux au maximum de l'environnement",
  },
  {
    src: "/images/icons/giftbox.png",
    alt: "logo cadeau",
    text: "Le cadeau personalisé parfait",
  },
];

type PosterDetailsProps = {
  prompt: string;
};

const PosterDetails = ({ prompt }: PosterDetailsProps) => (
  <div className="mt-10 w-full md:ml-4">
    <Tabs defaultValue="details">
      <TabsList className="w-full">
        <TabsTrigger value="details" className="w-1/2">
          Details du produit
        </TabsTrigger>
        <TabsTrigger value="faq" className="w-1/2">
          FAQ
        </TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <div className="sm:flex">
          <div className="m-4 mt-8 w-full sm:w-1/2">
            <div className="w-full">
              Poster imprimé en France dans l'imprimerie de ..............
            </div>
            <div className="mt-4">
              <span className="w-full">La prompt originale est : </span>
              <div className="my-2 text-center  align-middle xl:mx-4">
                <div className="text-sm sm:text-xs ">"{prompt}"</div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            {posterDetailsData.map((data) => (
              <div key={data.src} className="m-4 flex items-center">
                <div className="w-2/12 rounded-full bg-white">
                  <Image
                    src={data.src}
                    alt={data.alt}
                    width="256"
                    height="256"
                    className=""
                  />
                </div>
                <span className="ml-4 w-9/12 text-xs">{data.text}</span>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="faq">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="w-full py-4">
            <AccordionTrigger className="mx-4 font-bold">
              Quel est le délai de livraison ?
            </AccordionTrigger>
            <AccordionContent className="mx-8">
              Vous recevrez votre colis sous 5 à 7 jours ouvrés. Si vous avez
              des questions, n'hésitez pas à nous contacter à l'adresse suivante
              :
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="w-full py-4">
            <AccordionTrigger className="mx-4 font-bold">
              A combien s'élèvent les frais d'envois ?
            </AccordionTrigger>
            <AccordionContent className="mx-8">
              les frais d'envois sont de 5€ pour la France et 10€ pour pour
              outre atlantique.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="w-full py-4">
            <AccordionTrigger className="mx-4 font-bold">
              Quelle est la politique de retour ?
            </AccordionTrigger>
            <AccordionContent className="mx-8">
              La maison n'accepte pas les retours, c'est pas Amazon ici.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
    </Tabs>
  </div>
);

export default PosterDetails;

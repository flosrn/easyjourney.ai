import { useState } from "react";
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

export default function PosterDetails({ prompt }: PosterDetailsProps) {
  return (
    <>
      <div className="w-full ">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="">
            <TabsTrigger value="details">Details du produit</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <div className=" sm:flex">
              <div className="m-4 mt-8 w-full sm:w-1/2">
                <div className="w-full">
                  Poster imprimé en France dans l'imprimerie de ..............
                </div>
                <div className="mt-4">
                  <span className="w-full">La prompt originale est : </span>
                  <div className="mx-4 my-2  text-center align-middle">
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
                <AccordionTrigger className=" mx-4 text-xl font-bold">
                  Quel est le délai de livraison ?
                </AccordionTrigger>
                <AccordionContent className="mx-8">
                  Vous recevrez votre colis sous 5 à 7 jours ouvrés. Si vous
                  avez des questions, n'hésitez pas à nous contacter à l'adresse
                  suivante :
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

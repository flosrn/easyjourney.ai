import { useState } from "react";
import Image from "next/image";

import Accordion from "~/components/accordion/AccordionComponent";
import AccordionComponent from "~/components/accordion/AccordionComponent";

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

export default function PosterDetails({ prompt }) {
  const [activeTab, setActiveTab] = useState("details");
  return (
    <>
      <div className="mt-8 flex w-full  border-b border-white">
        <div
          className={`p-4 px-8 text-xl font-bold ${
            activeTab === "details" ? "border-b-4" : ""
          }`}
          onClick={() => setActiveTab("details")}
        >
          Details du produit
        </div>
        <div
          className={`p-4 px-8 text-xl font-bold ${
            activeTab === "FAQ" ? "border-b-4" : ""
          }`}
          onClick={() => setActiveTab("FAQ")}
        >
          FAQ
        </div>
      </div>
      <div className="flex w-full ">
        {activeTab === "details" ? (
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
        ) : (
          <AccordionComponent />
        )}
      </div>
    </>
  );
}

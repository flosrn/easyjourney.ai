"use client";

import React, { useEffect } from "react";
import Link from "next/link";
// import { useParams } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";

type CheckoutSuccessProps = {};

const CheckoutSuccess = ({}: CheckoutSuccessProps) => {
  // Come in future release of Next.js
  // const params = useParams();
  const { clearCart } = useShoppingCart();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div>
          <svg
            className="mx-auto h-12 w-auto text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l5-5z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Paiement réussi !
          </h2>
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">
          Merci pour votre achat. Votre commande sera expédiée sous peu.
        </p>
        <Link
          href="/"
          className="flex-center mt-6 w-full rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;

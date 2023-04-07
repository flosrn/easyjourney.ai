import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center text-white">
        <h2 className="text-5xl font-bold">Page en construction</h2>
        <h3 className="mb-6 mt-4 text-3xl">Revenez plus tard</h3>
        <div className="mt-8">
          <Link
            href="/"
            className="rounded-md bg-white px-4 py-2 font-semibold text-blue-600 shadow-md hover:bg-blue-100"
          >
            Retour à la page d'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

import React, { Suspense } from "react";

import Posters from "../Posters";

export default async function NewPage() {
  return (
    <>
      <section className="container mt-6 grid items-center justify-center gap-6 pb-8">
        <Suspense fallback={<div>Loading posters...</div>}>
          {/* @ts-expect-error Server Component */}
          <Posters />
        </Suspense>
      </section>
    </>
  );
}

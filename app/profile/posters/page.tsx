import React, { Suspense } from "react";
import { getSession } from "~/server/auth";

import Posters from "../../posters/Posters";

export default async function MyPostersPage() {
  const session = await getSession();
  return (
    <>
      <section className="container mt-6 grid items-center justify-center gap-6 pb-8">
        <Suspense fallback={<div>Loading posters...</div>}>
          {/* @ts-expect-error Server Component */}
          <Posters userId={session.user.id} />
        </Suspense>
      </section>
    </>
  );
}

import React, { type PropsWithChildren } from "react";
import { getSession } from "~/server/auth";

import NotLoggedIn from "~/components/ui/error/NotLoggedIn";

const CreateLayout = async ({ children }: PropsWithChildren) => {
  const session = await getSession();

  if (!session) {
    return <NotLoggedIn />;
  }
  return <>{children}</>;
};

export default CreateLayout;

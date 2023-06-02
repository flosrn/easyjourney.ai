import React from "react";

import { Button } from "~/components/ui/button";

type NotLoggedInProps = {};

const NotLoggedIn = ({}: NotLoggedInProps) => {
  return (
    <div className="mt-4 flex flex-col items-center gap-4 md:mt-8 md:gap-8">
      You are not logged in.
      <Button variant="outline" href="/api/auth/signin">
        Sign in
      </Button>
    </div>
  );
};

export default NotLoggedIn;

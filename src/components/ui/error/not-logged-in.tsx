import React from "react";
import Link from "next/link";

import { Button } from "~/components/ui/button";

type NotLoggedInProps = {};

const NotLoggedIn = ({}: NotLoggedInProps) => {
  return (
    <div className="mt-4 flex flex-col items-center gap-4 md:mt-8 md:gap-8">
      You are not logged in.
      <Button asChild variant="outline">
        <Link href="/api/auth/signin">Sign in</Link>
      </Button>
    </div>
  );
};

export default NotLoggedIn;

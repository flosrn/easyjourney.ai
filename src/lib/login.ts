import isWebview from "is-ua-webview";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

export async function login() {
  if (isWebview(window.navigator.userAgent)) {
    toast(
      "Open Easyjourney in Safari or Chrome to sign in.\n\nGoogle does not support embedded browser.",
      {
        duration: 10000,
      }
    );
    return;
  }
  await signIn();
}

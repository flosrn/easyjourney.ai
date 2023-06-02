import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { ShoppingCart, X } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";

import CartItem from "~/components/shopping-cart/cart-item";
import { Button } from "~/components/ui/button";

type CartDrawerProps = {};

const sideVariants = {
  closed: {
    translateX: "100%",
    transition: {
      bounce: 0,
    },
  },
  open: {
    translateX: "0%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 50,
      mass: 1,
    },
  },
};

const itemsVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const CartDrawer = ({}: CartDrawerProps) => {
  const [open, cycleOpen] = useCycle(false, true);
  const { formattedTotalPrice, cartCount, cartDetails, redirectToCheckout } =
    useShoppingCart();

  const onOpenChange = () => cycleOpen();

  const handleCheckout: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    const response: any = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartDetails),
    });

    const data = await response.json();

    if (response.statusCode > 399) {
      // eslint-disable-next-line no-console
      console.error(response.message);
      return;
    }
    // eslint-disable-next-line no-console
    console.log("data :", data);
    await redirectToCheckout(data.id);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger className="flex-center relative h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900">
        {cartCount
          ? cartCount > 0 && (
              <span className="absolute -right-4 -top-1 mr-2 inline-flex items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-red-100">
                {cartCount}
              </span>
            )
          : null}
        <ShoppingCart size={20} />
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Overlay
            forceMount
            asChild
            onPointerDown={(event) => {
              if (event.target === event.currentTarget) onOpenChange();
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ damping: 90 }}
              className="fixed inset-0 z-10 bg-black/50"
            />
          </Dialog.Overlay>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <Dialog.Content forceMount className="fixed z-50">
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
              className="fixed right-0 top-0 h-full w-96 overflow-hidden bg-white p-6"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.35 }}
              >
                <button
                  className="flex-center absolute right-2 top-2 h-10 w-10 text-black"
                  onClick={() => onOpenChange()}
                >
                  <X size={26} />
                </button>

                <h2 className="mb-4 text-2xl font-bold text-black">
                  Panier d'achat
                </h2>
                <motion.ul
                  initial="closed"
                  animate="open"
                  exit="open"
                  variants={itemsVariants}
                  className="divide-y divide-gray-200"
                >
                  {cartDetails && cartCount && cartCount > 0 ? (
                    Object.keys(cartDetails).map((key) => (
                      <motion.li
                        key={key}
                        variants={itemVariants}
                        className="flex py-4"
                      >
                        <CartItem item={cartDetails[key]} />
                      </motion.li>
                    ))
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-600">Votre panier est vide</p>
                    </div>
                  )}
                </motion.ul>

                <div className="mt-4 flex justify-between">
                  <span className="text-gray-600">
                    Total: {formattedTotalPrice}
                  </span>
                </div>

                <Button
                  disabled={cartCount === 0}
                  className="mt-4 w-full"
                  onClick={handleCheckout}
                >
                  Commander
                </Button>
              </motion.div>
            </motion.aside>
          </Dialog.Content>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

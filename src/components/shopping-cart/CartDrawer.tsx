import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import type { CartItemType } from "~/store/useCartStore";

import CartItem from "~/components/shopping-cart/CartItem";

type CartDrawerProps = {
  items: CartItemType[];
};

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

export const CartDrawer = ({ items }: CartDrawerProps) => {
  const [open, cycleOpen] = useCycle(false, true);
  const onOpenChange = () => cycleOpen();
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger className="flex-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900">
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
          <Dialog.Content forceMount className="fixed inset-0 z-50 w-96">
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
              className="fixed top-0 right-0 h-full w-96 overflow-hidden bg-white p-6"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.35 }}
              >
                <button
                  className="flex-center h-10 w-10 text-black"
                  onClick={() => onOpenChange()}
                >
                  X
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
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      variants={itemVariants}
                      className="flex py-4"
                    >
                      <CartItem {...item} />
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.aside>
          </Dialog.Content>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

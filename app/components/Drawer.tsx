"use client";

import { use, useEffect, useState } from "react";
import { X } from 'lucide-react';
import { Drawer } from "vaul";
import { Button } from "@nextui-org/react";

export function MyDrawer({ isOpen, handleClose, type }: { isOpen: boolean, handleClose: () => void, type: "retweet" | "quote"   }  ) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }
  , [isOpen]);
  return (
    <Drawer.Root dismissible={false} open={open}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1 dark:bg-gray-800 dark:text-white">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
                className="absolute right-3 top-2"
              >
                <X className=" text-black dark:text-white" />
              </Button>
         </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

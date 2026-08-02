"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/brand/logo";
import { navigation } from "@/content/home";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="nav-trigger" aria-label="Open navigation">
        <Menu aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="nav-backdrop" />
        <Dialog.Popup className="nav-drawer">
          <div className="nav-drawer__header">
            <Logo />
            <Dialog.Close className="nav-trigger" aria-label="Close navigation">
              <X aria-hidden="true" />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
          <nav aria-label="Mobile navigation" className="nav-drawer__links">
            {navigation.map((item, index) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="nav-drawer__footer">
            <p>Ready to move an idea forward?</p>
            <a href="https://linktr.ee/Impactional.org" target="_blank" rel="noreferrer">
              Find an opportunity <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

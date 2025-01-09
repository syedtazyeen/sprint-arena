"use client";
import Logo from "@/components/common/logo";
import Button from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import NavButton from "./NavButton";
import { navMenu } from "./nav";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { useAppStore } from "@/stores";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUser } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function fetchEvents() {
    const url = `/api/users/me`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return;
    }
    const result = await response.json();
    setUser(result);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SessionProvider>
      <div>
        <div className="fixed w-full top-0 z-50 flex items-center justify-between gap-4 px-8 h-14 border-b backdrop-blur-sm bg-background/80">
          <div className="flex items-center gap-4 w-44">
            <Logo />
          </div>
          <div className="flex-1 flex items-center justify-center gap-4 h-full">
            {navMenu.map((item, index) => (
              <NavButton key={index} {...item} />
            ))}
          </div>
          <div className="flex items-center gap-4 w-44">
            <Link href="/host">
              <Button
                variant="outline"
                className="flex items-center gap-1"
                size="small"
              >
                <Plus className="w-4" />
                Host
              </Button>
            </Link>
            <Link href="/profile">
              <Button
                variant="outline"
                className="aspect-square mt-1"
                rounded="full"
                size="small"
              >
                <User className="w-5" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full mt-14 max-w-5xl mx-auto px-4">{children}</div>
        <Toaster />
      </div>
    </SessionProvider>
  );
}

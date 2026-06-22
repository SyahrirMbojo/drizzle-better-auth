"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { User } from "@/lib/auth";
import { UserDropdown } from "./user-dropdown";

export default function Navbar({ user }: { user?: User }) {
  const pathname = usePathname();
  const isAuth = pathname === "/login" || pathname === "/signup";

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  if (isAuth) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 bg-background/80 backdrop-blur-md border-b">
      <div className="mx-auto max-w-6xl py-3 px-4 lg:px-0 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-6">
          <Link href="/">
            <h1 className="font-bold text-2xl hover:opacity-80 transition-opacity">
              My Demo App
            </h1>
          </Link>
          <div className="flex flex-row gap-1">
            <Link href="/">
              <Button variant={isActive("/") ? "default" : "ghost"}>
                Home
              </Button>
            </Link>
            <Link href="/posts">
              <Button variant={isActive("/posts") ? "default" : "ghost"}>
                Posts
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <UserDropdown user={user!} />
        </div>
      </div>
    </header>
  );
}

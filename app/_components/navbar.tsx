"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="Finance AI" width={173} height={39} />
        <Link
          className={
            pathName === "/"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
          href="/"
        >
          Dashboard
        </Link>
        <Link
          className={
            pathName === "/transactions"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
          href="/transactions"
        >
          Transações
        </Link>
        <Link
          className={
            pathName === "/subscription"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
          href="/subscription"
        >
          Assinatura
        </Link>
      </div>

      <UserButton showName />
    </nav>
  );
};

export default Navbar;

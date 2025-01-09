import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/" className="w-8 h-8">
      <img className="w-full h-full" src="/logo.png" />
    </Link>
  );
}

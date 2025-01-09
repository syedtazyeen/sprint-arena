import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export interface NavButtonProps {
  label: string;
  path: string;
}

export default function NavButton(props: NavButtonProps) {
  const pathname = usePathname();

  const isActive = pathname === props.path || pathname.startsWith(props.path);

  return (
    <Link className="h-full" href={props.path}>
      <button
        className={clsx([
          "p-1 font-medium h-full relative",
          isActive ? "text-primary" : "opacity-60 hover:opacity-100",
        ])}
      >
        {props.label}
        <span
          className={clsx([
            "absolute top-0 left-0 w-full h-1.5 rounded-b-xl",
            isActive ? "bg-primary" : "",
          ])}
        />
      </button>
    </Link>
  );
}

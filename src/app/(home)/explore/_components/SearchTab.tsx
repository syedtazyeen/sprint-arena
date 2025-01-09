"use client";

import Button from "@/components/ui/button";
import { ChevronDown, LayoutList, MapPin, PlusCircle, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SearchTab() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      if (searchText.length === 0) {
        router.replace(pathname);
        return;
      }
      router.replace(`${pathname}?search=${searchText}`);
    }, 500);
  }, [searchText]);

  return (
    <div className="w-full py-3 pt-4 flex items-center gap-4 justify-center">
      <div className="border rounded-full h-10 px-3 flex  items-center gap-1 w-80">
        <Search className="w-4 text-foreground/50" />
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-foreground/50"
        />
        <button
          onClick={() => setSearchText("")}
          disabled={searchText.length === 0}
          className="disabled:opacity-0 opacity-50 hover:opacity-80"
        >
          <PlusCircle className={`rotate-45 w-4`} />
        </button>
      </div>
      <Button
        variant="outline"
        className="flex items-center gap-1 text-sm"
        size="medium"
        rounded="full"
      >
        <MapPin className="w-4" />
        Location
        <ChevronDown className="w-4" />
      </Button>
      <Button
        variant="outline"
        className="flex items-center gap-1 text-sm"
        size="medium"
        rounded="full"
      >
        <LayoutList className="w-4" />
        Category
        <ChevronDown className="w-4" />
      </Button>
      {/* <Button
        variant="outline"
        className="flex items-center gap-1 text-sm"
        size="medium"
        rounded="full"
      >
        <PlusCircle className="w-4 rotate-45 mr-1" />
        Clear all
      </Button> */}
    </div>
  );
}

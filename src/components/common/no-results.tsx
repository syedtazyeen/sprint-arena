import { SearchX } from "lucide-react";
import React from "react";

export default function NoResults() {
  return (
    <div className="border rounded-xl my-2 h-96 aspect-video w-full flex flex-col gap-2 items-center justify-center text-foreground/50">
      <SearchX />
      <p className="font-semibold">Didn't find the results you are looking</p>
    </div>
  );
}

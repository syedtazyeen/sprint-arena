import React from "react";
import SearchTab from "./_components/SearchTab";
import List from "./_components/List";

export default function page() {


  return (
    <div className="flex-1 flex flex-col h-full">
      <SearchTab />
      <List/>
    </div>
  );
}

"use client";

import NoResults from "@/components/common/no-results";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ListItem from "./ListItem";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function List() {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<EventDetails[]>([]);
  const searchParams = useSearchParams();
  const controllerRef = React.useRef<AbortController | null>(null);

  async function fetchEvents() {
    setIsLoading(true);
    setEvents([]);
    const searchText = searchParams.get("search");

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    setTimeout(async () => {
      const url = searchText
        ? `/api/events?search=${searchText}`
        : `/api/events`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal,
        });

        if (!response.ok) {
          toast.error("Failed to load events");
          setIsLoading(false);
          return;
        }

        const result = await response.json();
        setEvents(result);
        setIsLoading(false);
      } catch (error: any) {
        if (error?.name === "AbortError") {
          console.log("Request aborted due to search change.");
        } else {
          toast.error("An error occurred while fetching events");
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 250);
      }
    }, 250);
  }

  useEffect(() => {
    fetchEvents();
  }, [searchParams]);

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center h-80">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (events.length === 0) return <NoResults />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2 px-8 sm:px-4">
      {events?.map((item, index) => (
        <ListItem key={index} {...item} />
      ))}
    </div>
  );
}

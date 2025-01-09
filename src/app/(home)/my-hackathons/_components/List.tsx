"use client";

import NoResults from "@/components/common/no-results";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ListItem from "./ListItem";
import { Loader2 } from "lucide-react";
import { useAppStore } from "@/stores";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function List() {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<EventDetails[]>([]);
  const { user } = useAppStore();
  const { data: session } = useSession();

  async function fetchEvents() {
    setIsLoading(true);
    if (!user || !user.id) return;
    const url = `/api/events/users/${user.id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error("Failed to load events");
      setIsLoading(false);
      return;
    }

    const result = await response.json();
    setEvents(result);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!session) redirect("/login");
    fetchEvents();
  }, [user]);

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center h-80">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (events.length === 0) return <NoResults />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
      {events?.map((item, index) => (
        <ListItem key={index} {...item} />
      ))}
    </div>
  );
}

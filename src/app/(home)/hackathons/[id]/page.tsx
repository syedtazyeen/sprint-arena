"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Button from "@/components/ui/button";
import { Loader2, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import NoResults from "@/components/common/no-results";

type EventDetails = {
  id: string;
  name: string;
  details: string;
  hosts: string[];
  location: string;
  price?: number | null;
  category?: string;
  tags?: string[] | null;
  seats?: number | null;
  occupancy?: number | null;
  eventLink?: string | null;
  createdAt: string;
  startAt: string;
  endAt: string;
  userId: string;
  creator: User;
};

const EventPage = () => {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (params?.id) {
      setLoading(true);
      fetch(`/api/events/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
          setEvent(data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Error fetching event details");
          setLoading(false);
        });
    }
  }, [params.id]);

  const handleRegister = async () => {
    if (!session?.user?.email) {
      toast.error("You must be logged in to register");
      return;
    }

    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      toast.success("Successfully registered for the event!");
    } catch (error) {
      toast.error("Error registering for the event");
    }
  };

  if (loading)
    return (
      <div className="w-full flex items-center justify-center h-80">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (!event) return <NoResults />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-4">
        <div className="h-24 w-24 border overflow-hidden rounded-xl">
          {event.creator?.image ? (
            <img
              className="w-full h-full object-cover"
              src={event.creator.image}
              alt={event.creator.name}
            />
          ) : (
            <p className="bg-gray-500/50 text-white w-full h-full flex items-center justify-center text-xl font-bold">
              {event.creator.name.substring(0, 1)}
            </p>
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-primary">{event.name}</h1>
          <p className="text-sm opacity-50 my-1">{event.creator.name}</p>
          <p className="text-xs text-gray-500">
            <MapPin className="w-3 inline-block" /> {event.location}
          </p>
          <p className="text-sm mt-2">{event.details}</p>
          {event.price && (
            <p className="mt-2">
              <strong>Price:</strong> ${event.price}
            </p>
          )}
          <p className="mt-2">
            <strong>Start Date:</strong>{" "}
            {new Date(event.startAt).toLocaleString()}
          </p>
          <p className="mt-2">
            <strong>End Date:</strong> {new Date(event.endAt).toLocaleString()}
          </p>
          {event.tags && event.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {event.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full p-2 border text-sm text-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6">
            {session?.user?.email === event.creator.email ? (
              <Button
                variant="outline"
                size="small"
                onClick={() => router.push(`/hackathons/${event.id}/manage`)}
              >
                Manage Event
              </Button>
            ) : (
              <Button variant="primary" size="small" onClick={handleRegister}>
                Register
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;

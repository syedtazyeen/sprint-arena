import Button from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function ListItem(props: EventDetails) {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/hackathons/${props.id}`);
      }}
      className="flex gap-2 border p-4 rounded-xl w-full hover:border-primary cursor-pointer transition-colors duration-150"
    >
      <div className="h-12 w-12 border overflow-hidden rounded-xl">
        {props.creator.image ? (
          <img
            className="w-full h-full object-cover"
            src={props.creator.image}
          />
        ) : (
          <p className="bg-gray-500/50 text-white w-full h-full flex items-center justify-center text-xl font-bold">
            {props.creator.name.substring(0, 1)}
          </p>
        )}
      </div>
      <div className="overflow-hidden flex-1">
        <p className="opacity-50 text-xs flex items-center gap-1">
          <MapPin className="w-3" /> {props.location}
        </p>
        <p className="text-lg font-semibold text-primary break-words leading-tight line-clamp-2">
          {props.name}
        </p>
        <p className="text-xs opacity-50 my-1">{props.creator.name}</p>
        <p className="text-sm opacity-60 break-words line-clamp-2 leading-tight">
          {props.details}
        </p>
        <div className="mt-4">
          {props.tags?.slice(0, 2).map((item, index) => (
            <span
              key={index}
              className="rounded-full p-2 border text-sm text-foreground/70"
            >
              {item}
            </span>
          ))}
        </div>
        <div>
          {session?.user?.email === props.creator.email ? (
            <Link href={`/hackathons/${props.id}/manage`}>
              <Button size="small" variant="outline">
                Manage
              </Button>
            </Link>
          ) : (
            <Link href={`/hackathons/${props.id}`}>
              <Button size="small" variant="primary">
                Register
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

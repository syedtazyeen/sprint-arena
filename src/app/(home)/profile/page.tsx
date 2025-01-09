"use client";

import { useAppStore } from "@/stores";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function Page() {
  const { data: session } = useSession();
  const { user } = useAppStore();
  if (!session) redirect("/login");
  function handleSignOut() {
    signOut({ callbackUrl: "/login" });
    toast.success("Logged out");
  }
  return (
    <div className="py-8">
      <p className="text-xl font-bold">My Profile</p>
      <div className="flex flex-col items-center p-6 rounded-xl  mt-8 border">
        <div className="relative">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />
        </div>

        <div className="mt-4 text-center">
          <p className="text-2xl font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.email}</p>
          <p className="text-sm  mt-2">
            A passionate developer and hackathon enthusiast.
          </p>
        </div>

        <button
          onClick={handleSignOut}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Log Out
        </button>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className=" p-6 rounded-xl border text-center">
          <p className="text-xl font-semibold">Total Events</p>
          <p className="text-3xl font-bold text-primary">0</p>
        </div>
        <div className=" p-6 rounded-xl border text-center">
          <p className="text-xl font-semibold">Following</p>
          <p className="text-3xl font-bold text-primary">0</p>
        </div>
        <div className=" p-6 rounded-xl border text-center">
          <p className="text-xl font-semibold">Followers</p>
          <p className="text-3xl font-bold text-primary">0</p>
        </div>
      </div>
    </div>
  );
}

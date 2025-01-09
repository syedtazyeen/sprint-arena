"use client"

import React from "react";

export default function Page() {
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
          <p className="text-2xl font-semibold">John Doe</p>
          <p className="text-sm">john.doe@example.com</p>
          <p className="text-sm  mt-2">
            A passionate developer and hackathon enthusiast.
          </p>
        </div>
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

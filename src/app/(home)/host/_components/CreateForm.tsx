"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const hackathonSchema = z.object({
  name: z.string().nonempty("Name is required"),
  details: z.string().nonempty("Details are required"),
  category: z.string().nonempty("Category is required"),
  location: z.string().nonempty("Location is required"),
  startAt: z.string().nonempty("Start date and time are required"),
  endAt: z.string().nonempty("End date and time are required"),
});

type HackathonFormValues = z.infer<typeof hackathonSchema>;

export default function CreateForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<HackathonFormValues>({
    resolver: zodResolver(hackathonSchema),
    defaultValues: {
      name: "",
      details: "",
      category: "",
      location: "",
      startAt: "",
      endAt: "",
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: HackathonFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        if (result?.id) router.push(`/hackathons/${result.id}`);
        toast.success("Hackathon created successfully!");
        console.log("Hackathon created successfully", result);
      } else {
        toast.error(result.message || "Creation failed");
        console.log("Creation failed", result);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error during creation", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-8 grid grid-cols-2 gap-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium opacity-80"
          >
            Hackathon Name
          </label>
          <input
            id="name"
            {...register("name")}
            className="mt-1 block w-[24rem] shadow-sm sm:text-sm outline-none p-3 bg-transparent border rounded-xl"
            placeholder="Enter hackathon name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium opacity-80"
          >
            Location
          </label>
          <input
            id="location"
            {...register("location")}
            className="mt-1 block w-[24rem] shadow-sm sm:text-sm outline-none p-3 bg-transparent border rounded-xl"
            placeholder="Enter location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="details"
            className="block text-sm font-medium opacity-80"
          >
            Hackathon Details
          </label>
          <input
            id="details"
            {...register("details")}
            className="mt-1 block w-[24rem] shadow-sm sm:text-sm outline-none p-3 bg-transparent border rounded-xl"
            placeholder="Enter hackathon details"
          />
          {errors.details && (
            <p className="text-red-500 text-sm mt-1">
              {errors.details.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium opacity-80"
          >
            Category
          </label>
          <input
            id="category"
            {...register("category")}
            className="mt-1 block w-[24rem] shadow-sm sm:text-sm outline-none p-3 bg-transparent border rounded-xl"
            placeholder="Enter category"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="startAt"
            className="block text-sm font-medium opacity-80"
          >
            Start Date and Time
          </label>
          <input
            id="startAt"
            type="datetime-local"
            {...register("startAt")}
            className="mt-1 block w-[24rem] shadow-sm sm:text-sm outline-none p-3 bg-transparent border rounded-xl"
          />
          {errors.startAt && (
            <p className="text-red-500 text-sm mt-1">
              {errors.startAt.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="endAt"
            className="block text-sm font-medium opacity-80"
          >
            End Date and Time
          </label>
          <input
            id="endAt"
            type="datetime-local"
            {...register("endAt")}
            className="mt-1 block w-[24rem] shadow-sm sm:text-sm outline-none p-3 bg-transparent border rounded-xl"
          />
          {errors.endAt && (
            <p className="text-red-500 text-sm mt-1">{errors.endAt.message}</p>
          )}
        </div>

        <Button isLoading={isLoading} type="submit" className="w-40 mt-8">
          Create
        </Button>
      </form>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/button";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type registerFormInputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormInputs>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: registerFormInputs) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        router.push("/login");
        toast.success("Registration successful!");
        console.log("User registered successfully", result);
      } else {
        toast.error(result.message || "Registration failed");
        console.log("Registration failed", result);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error during registration", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className=" p-8 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome back!</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="name"
              placeholder="Name"
              {...register("name")}
              className="w-full p-3 border  rounded-xl"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-3 border  rounded-xl"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="pb-4">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full p-3 border rounded-xl"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button className="w-full" isLoading={isLoading}>
            Create account
          </Button>
        </form>
        <div className="w-full">
          <p className="w-full text-center p-2 opacity-50">or</p>
          <Button className="w-full">Continue with Google</Button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

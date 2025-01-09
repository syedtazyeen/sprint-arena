"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/button";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    const response = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setIsLoading(false);
    if (response?.error) {
      toast.error("Login failed");
      router.push("/");
      console.log("Login failed", response.error);
    } else {
      toast.success("Login successful");
      console.log("Login successful");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className=" p-8 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome back!</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            Login
          </Button>
        </form>
        <div className="w-full">
          <p className="w-full text-center p-2 opacity-50">or</p>
          <Button className="w-full">Continue with Google</Button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

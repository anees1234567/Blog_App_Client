"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { loginService } from "../service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/lib/hooks/useUser";
import { userType } from "../type";
import { toast } from "react-toastify";
import { useEffect } from "react";




export default function LoginPage() {
    const router = useRouter();
    const {loginUser,logoutUser}=useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

   const {mutate}=useMutation({mutationFn:loginService,onSuccess:(data:any)=>{
        if(data?.responseIndicator=="success"){
            loginUser(data?.response)
             document.cookie = `accessToken=${data?.response?.accessToken}; path=/; max-age=86400; secure; samesite=lax`;
             console.log("Cookie set:", document.cookie);
            router.push("/blog")
        }else{
            toast.error("user Login failed")
        }
   },onError:()=>{
      toast.error("user Login failed")
   }
})

  const onSubmit = (data:{email:string,password:string}) => {
    mutate(data)
  };

  useEffect(()=>{
    logoutUser()
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 px-6 sm:px-10 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        

        {/* Login Card */}
        <div className="relative bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 mb-8 text-center">
            Login
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 shadow-md hover:shadow-lg transition hover:scale-105"
            >
              <LogIn size={18} />
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
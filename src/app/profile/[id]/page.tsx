"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useUser } from "@/app/lib/hooks/useUser";
import { profileUpdateType } from "../type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile, updateProfile } from "../service";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { usePost } from "@/app/lib/hooks/usePost";



type FormData= {
  name: string;
  bio: string;
  avatar: string;
}

export default function EditProfilePage() {
  const { user, isAuthenticated,loginUser  } = useUser();

    const router=useRouter()
  const params = useParams(); 
  const id = params?.id as string;
     const { data,  error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(id as string ) ,
  });

  const {mutate}=useMutation({mutationFn:updateProfile,onSuccess:(data)=>{
    toast.success("profile updated successfully")
    data?.id==user?.id && loginUser(data)
    router.back()
  }})

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      avatar: user?.avatar || "",
    },
  });

  const onSubmit = async (data:FormData) => {

  const body:profileUpdateType={
    name:data.name,
    bio:data.bio,
    avatar:data.avatar,
    id:user?.id
  }
      mutate(body)
  }

  const handleCancel = () => {
    reset();
    window.location.href = "/profile";
  };

useEffect(() => {

  if (data) { 
    reset({
      name: data.name || "",
      bio: data.bio || "",
      avatar: data.avatar || "",
    });
  }
}, [data, reset]);

  if (!isAuthenticated || !user) {
    return <div className="text-center text-red-500">Please log in to edit your profile.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 px-6 sm:px-10">
      <div className="max-w-md mx-auto">
        <Link
          href="/profile"
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline mb-8"
        >
          <ArrowLeft size={18} /> Back to Profile
        </Link>

        <div className="relative bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 mb-8 text-center">
            Edit Profile
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
              >
                Avatar URL
              </label>
              <input
                id="avatar"
                {...register("avatar", { required: "Avatar URL is required" })}
                className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter avatar URL"
              />
              {errors.avatar && (
                <p className="mt-1 text-sm text-red-500">{errors.avatar.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
              >
                Name
              </label>
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
              >
                Bio
              </label>
              <textarea
                id="bio"
                {...register("bio")}
                rows={4}
                className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Write your bio..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 rounded-full text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-full text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 shadow-md transition"
              >
                <Save size={18} />
                update profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
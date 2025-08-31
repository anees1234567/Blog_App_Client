"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { ArrowLeft, List, Pencil, Trash2 } from "lucide-react";
import { useUser } from "@/app/lib/hooks/useUser";
import { getAllUsers } from "./service";
import { useRouter } from "next/navigation";
import { updateProfile } from "../profile/service";
import { toast } from "react-toastify";

export default function AdminPage() {
  const { user, isAuthenticated } = useUser();
  const router=useRouter()
  const queryClient = useQueryClient();

if (!isAuthenticated || user?.role !== "Admin") {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 px-6 sm:px-10">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 max-w-md text-center border border-red-300 dark:border-red-600">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
          Unauthorized
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Only <span className="font-semibold">Admins</span> can access this page.
        </p>
      </div>
    </div>
  );
}


  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  const {mutate:deleteUser}=useMutation({mutationFn:updateProfile,onSuccess:()=>{
    toast.success("user Deleted successfully")
    queryClient.invalidateQueries({ queryKey: ["users"] });
  }})

  const handleEdit = (id: string) => {
    console.log("Edit user:", id);
    router.push(`/profile/${id}`)
  };

  const handleDelete = (id: string) => {
    console.log("Delete user:", id);
    deleteUser({id:id,isDeleted:true})
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-700 py-16 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline mb-8"
        >
          <ArrowLeft size={18} /> Back to Feed
        </Link>

        <div className="relative bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:p-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 mb-8 text-center">
            Admin Dashboard: All Users
          </h1>

          {isLoading && (
            <div className="text-center text-indigo-600 dark:text-indigo-400">Loading...</div>
          )}
          {error && (
            <div className="text-center text-red-500">Error: {error.message}</div>
          )}

          {data??[].length > 0 ? (
            <div className="space-y-6">
              {data?.map((data,index) => (
                <li
                  key={`${index}${data._id}`}
                  className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl shadow-md hover:shadow-lg transition flex justify-between items-center"
                >
                  {/* User Info */}
                  <div>
                    <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
                      {data.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{data.email}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(data._id)}
                      className="p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-gray-700 transition"
                    >
                      <Pencil size={20} className="text-indigo-600 dark:text-indigo-400" />
                    </button>
                   {user.id!=data?._id && <button
                      onClick={() => handleDelete(data._id)}
                      className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-gray-700 transition"
                    >
                      <Trash2 size={20} className="text-red-500" />
                    </button>}
                  </div>
                </li>
              ))}
            </div>
          ) : (
            !isLoading && (
              <div className="text-center text-gray-600 dark:text-gray-300">
                No users found.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

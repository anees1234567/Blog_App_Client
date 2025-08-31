"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/app/lib/hooks/useUser";
import { usePost } from "@/app/lib/hooks/usePost";
import { getComments, createComment, deleteComment } from "../../services";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import Image from "next/image";





export default function Comments() {
    const { user } = useUser();
    const { post } = usePost();
    const [newComment, setNewComment] = useState("");

    const handleDelete = (id: string) => {
        deletedata(id)
    }

    const { mutate: getAllComments, data: comments = [], isPending } = useMutation({ mutationFn: () => getComments(post?._id as string) })
    const { mutate: deletedata } = useMutation({
        mutationFn: deleteComment, onSuccess: () => {
            toast.success("comment deleted successfully")
            getAllComments()
        }
    })

    const { mutate: addMutate } = useMutation({
        mutationFn: (body: { postId: string; commentText: string; posterId: string }) =>
            createComment(body),
        onSuccess: () => {
            toast.success("Comment added!");
            setNewComment("");
            getAllComments()
        },
        onError: () => toast.error("Failed to add comment."),
    });

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault()
        addMutate({
            postId: post?._id as string,
            commentText: newComment,
            posterId: user?.id as string,
        });
    };

    useEffect(() => {
        getAllComments()
    }, [])

    return (
        <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>


            {user ? (
                <form onSubmit={handleAddComment} className="mb-6">
                    <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl shadow-2xl p-4 mb-4">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"

                            className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            Post Comment
                        </button>
                    </div>
                </form>
            ) : (
                <p className="text-gray-500 mb-4">Login to post a comment.</p>
            )}


            {isPending ? (
                <p>Loading comments...</p>
            ) : comments.length === 0 ? (
                <p className="text-sm text-gray-600 italic text-center mt-4">
                    No comments yet. Be the first to share your thoughts!
                </p>
            ) : (
                <ul className="space-y-4">
                    {comments.map((comment: any) => (
                        <li
                            key={comment._id}
                            className="flex gap-4 items-start bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl shadow-md p-4"
                        >
                            <Image
                                src={comment?.posterId?.avatar}
                                alt={comment?.posterId?.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <p className="font-semibold">{comment?.posterId?.name}</p>
                                <p className="text-gray-700 dark:text-gray-300">{comment.commentText}</p>
                                <span className="text-xs text-gray-400">
                                    {new Date(comment.createdAt).toLocaleString()}
                                </span>
                            </div>

                            <button
                                onClick={() => handleDelete(comment?._id)}
                                className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                            >
                                <Trash2 className="w-5 h-5 text-red-500" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

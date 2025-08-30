"use client"
import { useUser } from "@/app/lib/hooks/useUser";
import Navbar from "../ui/Navbar";

export default function NavbarWrapper() {
  const { isAuthenticated } = useUser();
  if (!isAuthenticated) return null;
  return <Navbar />;
}
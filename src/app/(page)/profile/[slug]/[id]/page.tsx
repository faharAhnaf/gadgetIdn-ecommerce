"use client";
import { useParams } from "next/navigation";
import UserProfile from "../page";

export default function GetUserProfileById() {
  const { id } = useParams();
  console.log(id);
  return <UserProfile productId={id}></UserProfile>;
}

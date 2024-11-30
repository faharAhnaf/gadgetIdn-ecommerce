"use client";
import { useParams } from "next/navigation";
import UserProfile from "../page";

export default function ModalsPage({
  id,
}: {
  id: string | string[] | undefined;
}) {
  const { slug } = useParams();
  return <UserProfile productId={id} slug={slug}></UserProfile>;
}

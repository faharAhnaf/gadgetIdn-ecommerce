"use client";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="flex h-full flex-col items-start rounded-lg bg-white p-4 shadow-lg">
      {/* Image skeleton */}
      <div className="mb-4 w-full overflow-hidden rounded-md">
        <Skeleton className="aspect-square w-full" />
      </div>

      {/* Title skeleton */}
      <Skeleton className="mb-1 h-6 w-2/3" />

      {/* Description skeleton - multiple lines */}
      <div className="mb-2 w-full space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Price and button skeleton */}
      <div className="mt-auto flex w-full items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-9 w-28" />
      </div>
    </div>
  );
};

export default CardSkeleton;

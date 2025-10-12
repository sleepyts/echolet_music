import { useInViewport } from "ahooks";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useRef } from "react";

interface LazyAvatarProps {
  src: string;
  circle?: boolean;
  size?: number;
  alt?: string;

  inView?: boolean;
}

export const LazyAvatar = ({
  src,
  circle = false,
  size = 40,
  alt = "",
  inView = false,
}: LazyAvatarProps) => {
  if (inView) {
    return (
      <Avatar className="rounded-[4px] w-12 h-12">
        <AvatarImage src={src} alt={alt} loading="lazy" />
      </Avatar>
    );
  } else {
    return <Skeleton className="rounded-[4px] w-12 h-12" />;
  }
};

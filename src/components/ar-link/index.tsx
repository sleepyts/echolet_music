import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { go } from "@/lib/utils";

interface ArLinkProps {
  artits: any[];
}

export const ArLink = ({ artits }: ArLinkProps) => {
  return (
    <span className="overflow-hidden text-ellipsis whitespace-nowrap min-w-0 text-[10px] font-medium text-muted-foreground">
      {artits.map((artist, index) => (
        <span
          key={artist.id}
          className="hover:cursor-pointer hover:underline"
          onClick={() => go(`/artist/${artist.id}`)}
        >
          {artist.name}
          {index < artits.length - 1 && " / "}
        </span>
      ))}
    </span>
  );
};

import { RouteUtils } from "@/lib/utils";

interface ArLinkProps {
  artits: any[];
}

export const ArLink = ({ artits }: ArLinkProps) => {
  return (
    <span className="truncate min-w-0 text-[12px] font-medium text-muted-foreground">
      {artits.map((artist, index) => (
        <span
          key={artist.id}
          className="hover:cursor-pointer hover:underline"
          onClick={() => RouteUtils.go(`/artist/${artist.id}`)}
        >
          {artist.name}
          {index < artits.length - 1 && " / "}
        </span>
      ))}
    </span>
  );
};

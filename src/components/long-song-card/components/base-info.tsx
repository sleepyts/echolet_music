import { ArLink } from "@/components/ar-link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRef } from "react";
import Marquee from "react-fast-marquee";
interface TrackBaseinfoProps {
  albumUrl: string;
  name: string;
  artists: any[];
}
export const TrackBaseinfo = ({
  albumUrl,
  name,
  artists,
}: TrackBaseinfoProps) => {
  return (
    <>
      <Avatar className="rounded-[4px] w-12 h-12">
        <AvatarImage src={albumUrl} alt={name} />
      </Avatar>
      <div className="flex flex-col text-left ml-3 justify-between min-w-0">
        <span
          className="text-ellipsis whitespace-nowrap overflow-hidden "
          title={name}
        >
          {name}
        </span>
        <ArLink artits={artists} />
      </div>
    </>
  );
};

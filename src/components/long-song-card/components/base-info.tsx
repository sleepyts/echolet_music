import { ArLink } from "@/components/ar-link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

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
        {name}
        <ArLink artits={artists} />
      </div>
    </>
  );
};

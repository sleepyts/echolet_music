import { ArLink } from "@/components/ar-link";
import { HeadphonesIcon } from "lucide-react";

export const PlaylistShortInfo = ({
  playlistDetail,
}: {
  playlistDetail?: any;
}) => {
  return (
    <div className="flex flex-row mb-2">
      <div className="relative">
        <img
          src={`${playlistDetail?.coverImgUrl}`}
          className="w-[128px] h-[128px] rounded-[8px]"
          alt=" "
        />
        <span className="absolute top-0 right-0 bg-[#181818] text-white text-[12px] px-1 rounded-bl-[8px]">
          <div className="flex items-center justify-center">
            <HeadphonesIcon className="w-[12px] h-[12px] mr-1" />
            {playlistDetail?.trackCount}
          </div>
        </span>
      </div>

      <div className="flex-1 ml-[12px]">
        <div className="justify-between min-w-0">
          <span className="font-bold text-[20px]">{playlistDetail?.name}</span>
        </div>
      </div>
    </div>
  );
};

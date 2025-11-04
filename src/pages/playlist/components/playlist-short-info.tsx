import { ArLink } from "@/components/ar-link";
import TDialog from "@/components/TDialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FormatUtils } from "@/lib/utils";
import { t } from "i18next";
import {
  FolderCheckIcon,
  FolderHeartIcon,
  HeadphonesIcon,
  PlayIcon,
} from "lucide-react";

interface PlaylistShortInfoProps {
  playlistDetail?: any;
  isLoading?: boolean;
}

export const PlaylistShortInfo = ({
  playlistDetail,
  isLoading = false,
}: PlaylistShortInfoProps) => {
  if (isLoading) {
    return <PlaylistShortInfoSkeleton />;
  }
  return (
    <div className="flex flex-row mb-2">
      <div className="relative">
        <img
          src={`${playlistDetail?.coverImgUrl}?param=400y400`}
          className="w-[196px] h-[196px] rounded-[8px]"
          alt=" "
        />
        <span className="absolute top-0 right-0 bg-[#181818] text-white text-[12px] px-1 rounded-bl-[8px]">
          <div className="flex items-center justify-center">
            <HeadphonesIcon className="w-[12px] h-[12px] mr-1" />
            {FormatUtils.fromNumberToMillionOrBillion(
              playlistDetail?.playCount
            )}
          </div>
        </span>
      </div>

      <div className="flex-1 ml-[12px] flex flex-col items-start">
        <span className="font-bold text-[20px]">{playlistDetail?.name}</span>
        <TDialog
          trigger={
            <span className="mt-2 text-muted-foreground line-clamp-2 hover:text-foreground cursor-pointer transition-colors duration-200 text-left text-[14px]">
              {playlistDetail?.description}
            </span>
          }
          children={playlistDetail?.description}
          title={t("playlist-short-info.dialog-title")}
        ></TDialog>

        <div className="flex  mt-2 gap-2 items-center">
          <Button
            className=" text-[14px] p-0 hover:cursor-pointer "
            variant={"link"}
          >
            {playlistDetail?.creator?.nickname}
          </Button>
          <span className="text-[14px] text-muted-foreground">
            {`${t("playlist-short-info.create-at")} ${new Date(playlistDetail?.createTime).toLocaleDateString()}  `}
          </span>
        </div>

        <div className="mt-auto flex items-center gap-2">
          <Button
            className="text-[14px] bg-primary text-primary-foreground  "
            variant={"shrink"}
          >
            <PlayIcon />
            {t("playlist-short-info.play-all")}
          </Button>

          <Button
            className="text-[14px] bg-accent text-accent-foreground  "
            variant={"shrink"}
          >
            {playlistDetail?.subscribed ? (
              <FolderCheckIcon />
            ) : (
              <FolderHeartIcon />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const PlaylistShortInfoSkeleton = () => {
  return (
    <div className="flex flex-row mb-2">
      <Skeleton className="w-[196px] h-[196px] rounded-[8px]" />

      <div className="flex-1 ml-[12px] flex flex-col items-start">
        <Skeleton className="h-8 w-64 rounded-md" />

        <div className="flex flex-col space-y-2 mt-3">
          <Skeleton className="h-4 w-96 rounded-md" />
          <Skeleton className="h-4 w-80 rounded-md" />
        </div>

        <div className="flex mt-3 gap-2 items-center">
          <Skeleton className="h-5 w-24 rounded-md" />
          <Skeleton className="h-5 w-32 rounded-md" />
        </div>

        <div className="mt-auto flex items-center gap-2">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-12 rounded-md" />
        </div>
      </div>
    </div>
  );
};

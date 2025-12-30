import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { t } from "i18next";
import { PlayCircleIcon } from "lucide-react";

export const PlaylistPageEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <PlayCircleIcon />
        </EmptyMedia>
      </EmptyHeader>

      <EmptyContent>
        <EmptyTitle>{t("playlist-empty.title")}</EmptyTitle>
        <EmptyDescription>{t("playlist-empty.subtitle")}</EmptyDescription>
      </EmptyContent>
    </Empty>
  );
};

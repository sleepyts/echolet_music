import { SearchApis } from "@/apis/search";
import { LongSongCard } from "@/components/long-song-card";
import { usePaginationRequest } from "@/hooks/use-pagination-request";
import { SearchType } from "@/lib/types";
import { useCreation } from "ahooks";
import { useRef } from "react";

interface IProps {
  keywords: string;
}

export const TrackSearch = (props: IProps) => {
  const { keywords } = props;
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data, total, firstLoading, loading } = usePaginationRequest({
    request: SearchApis.search,
    bottomRef,
    limit: 30,
    resetDeps: [keywords],
    getData: (res: any) => res?.result?.songs || [],
    getTotal: (res: any) => res?.result?.songCount || 0,
    customArgs: {
      keywords,
      type: Number(SearchType.Track),
    },
  });
  const trackIds = useCreation(
    () => data?.map((item: any) => item.id) || [],
    [data]
  );

  return (
    <div>
      {data?.map((item: any, index: number) => (
        <LongSongCard
          key={item.id}
          track={item}
          index={index + 1}
          playlistIds={trackIds}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

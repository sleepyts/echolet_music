import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppConstMap } from "@/lib/map";
import { SearchType } from "@/lib/types";
import { TabsContent } from "@radix-ui/react-tabs";
import { useCreation } from "ahooks";
import { useParams } from "react-router-dom";
import { TrackSearch } from "./components/track-search";
import { useState } from "react";

export const SearchPage = () => {
  const searchKeywords = useParams().keywords || "";

  const tabList = useCreation(() => {
    return Object.keys(AppConstMap.SearchTypeToText).sort((a, b) => {
      return (
        // @ts-ignore
        AppConstMap.SearchTypeToText[Number(a)].priority -
        // @ts-ignore
        AppConstMap.SearchTypeToText[Number(b)].priority
      );
    });
  }, []);

  const [currentTab, setCurrentTab] = useState(tabList[0]);

  return (
    <div>
      <Tabs defaultValue={tabList[0]}>
        <TabsList>
          {tabList.map((key) => (
            <TabsTrigger
              key={key}
              value={key}
              onClick={() => setCurrentTab(key)}
            >
              {/* @ts-ignore */}
              {AppConstMap.SearchTypeToText[Number(key)].text || ""}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={SearchType.Track.toString()}>
          <TrackSearch keywords={searchKeywords} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

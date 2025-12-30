import type { SearchType } from "@/lib/types";
import { http } from "..";

export namespace SearchApis {
  export const search = ({
    keywords,
    type,
    offset = 0,
    limit = 30,
  }: {
    keywords: string;
    type: SearchType;
    offset?: number;
    limit?: number;
  }) => {
    return http
      .get("cloudsearch", {
        searchParams: {
          keywords: keywords,
          type: type,
          offset: offset,
          limit: limit,
        },
      })
      .json();
  };

  export const searchSuggest = (keywords: string, type?: SearchType) => {
    return http
      .get("search/suggest", {
        searchParams: {
          keywords: keywords,
          type: type,
        },
      })
      .json();
  };

  export const defaultSearchKeywords = () => {
    return http.get("search/default").json();
  };
}

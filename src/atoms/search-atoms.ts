import { atom } from "jotai";

import { SearchType } from "../lib/types";

interface SearchState {
  type: SearchType;

  data: any[];
}

export namespace SearchAtom {
  export const SearchStateAtom = atom<SearchState>({
    type: SearchType.Track,
    data: [],
  });

  export const SearchKeywordsAtom = atom<string>("");
}

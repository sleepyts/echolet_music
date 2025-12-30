import { useState } from "react";
import { useDebounceEffect, useFocusWithin, useMemoizedFn } from "ahooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchApis } from "@/apis/search";

export const HeaderSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchRef, setSearchRef] = useState<HTMLInputElement>();

  const [searchKeywords, setSearchKeywords] = useState("");

  const [searchSuggestions, setSearchSuggestions] = useState<any | undefined>(
    undefined
  );
  useFocusWithin(searchRef, {
    onFocus: () => {
      setIsOpen(true);
    },
    onBlur: () => {
      setIsOpen(false);
    },
  });

  useDebounceEffect(
    () => {
      if (!searchKeywords) {
        setSearchSuggestions(undefined);
        return;
      }
      SearchApis.searchSuggest(searchKeywords).then((res: any) => {
        setSearchSuggestions(res?.result || undefined);
      });
    },
    [searchKeywords],
    { wait: 500 }
  );

  const handleClickSuggestion = useMemoizedFn((name: string) => {
    setSearchKeywords(name);
  });

  return (
    <div className="flex items-center gap-1 ">
      <Popover open={isOpen}>
        <PopoverTrigger
          onMouseDown={() => {
            setIsOpen(true);
          }}
        >
          <Input
            ref={(el) => setSearchRef(el!)}
            placeholder="搜索"
            className="max-w-[200px] flex-1 "
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log("submit");
              }
            }}
            value={searchKeywords}
            onChange={(e) => setSearchKeywords(e.target.value)}
          />
        </PopoverTrigger>

        <PopoverContent
          className={`max-w-[400px] p-0 ${!searchSuggestions || !searchSuggestions.songs?.length ? "hidden" : ""}`}
        >
          <div className=" flex gap-1 flex-col p-1 ">
            {searchSuggestions?.songs?.map((item: any) => (
              <Button
                key={item.id}
                variant={"ghost"}
                onClick={() => handleClickSuggestion(item.name)}
              >
                <SearchIcon className="size-4" />
                <span className="truncate w-full text-left">{item.name}</span>
              </Button>
            ))}
            {searchSuggestions?.artists?.map((item: any) => (
              <Button
                key={item.id}
                variant={"ghost"}
                onClick={() => handleClickSuggestion(item.name)}
              >
                <SearchIcon className="size-4" />
                <span className="truncate w-full text-left">{item.name}</span>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Button variant={"click-shrink"}>
        <SearchIcon className="size-4" />
      </Button>
    </div>
  );
};

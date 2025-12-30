import { useState } from "react";
import {
  useDebounceEffect,
  useFocusWithin,
  useMemoizedFn,
  useRequest,
} from "ahooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchApis } from "@/apis/search";
import { RouteUtils } from "@/lib/utils";

export const HeaderSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchRef, setSearchRef] = useState<HTMLInputElement>();

  const [searchKeywords, setSearchKeywords] = useState("");
  const [defaultSearchKeywords, setDefaultSearchKeywords] = useState("");

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
    setIsOpen(false);

    RouteUtils.go(`/search/${searchKeywords}`);
  });

  const handleSubmit = useMemoizedFn(() => {
    let keywords = searchKeywords || defaultSearchKeywords;
    if (!keywords) {
      keywords = defaultSearchKeywords;
    }
    setIsOpen(false);
    RouteUtils.go(`/search/${keywords}`);
  });

  useRequest(() => SearchApis.defaultSearchKeywords(), {
    onSuccess: (res: any) => {
      setDefaultSearchKeywords(res?.data.styleKeyword.keyWord || "");
    },
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
            placeholder={defaultSearchKeywords || "搜索"}
            className="max-w-[200px] flex-1 "
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
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
                className="p-0 h-[32px]"
                onClick={() => handleClickSuggestion(item.name)}
              >
                <SearchIcon className="size-2" />
                <span className="truncate w-full text-left text-[12px]">
                  {item.name}
                </span>
              </Button>
            ))}
            {searchSuggestions?.artists?.map((item: any) => (
              <Button
                key={item.id}
                variant={"ghost"}
                className="p-0 h-[32px]"
                onClick={() => handleClickSuggestion(item.name)}
              >
                <SearchIcon className="size-2" />
                <span className="truncate w-full text-left text-[12px]">
                  {item.name}
                </span>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Button variant={"click-shrink"} onClick={handleSubmit}>
        <SearchIcon className="size-4" />
      </Button>
    </div>
  );
};

import { Search, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const AppHeader = () => {

  return (
    <div className="p-4 flex items-center gap-1">
      <Input
        placeholder="搜索"
        className="max-w-[200px] flex-1 "
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log("submit");
          }
        }}
      />
      <Button variant={'click-shrink'}>

      <SearchIcon className="size-4"/>

      </Button>

    </div>
  );
};

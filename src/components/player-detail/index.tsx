import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronUpIcon } from "lucide-react";
import PlayerDetailLeftContent from "./components/left-content";
import PlayerDetailRightContent from "./components/right-content";

export function PlayerDetail() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="click-shrink">
          <ChevronUpIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="w-full h-full">
        <div className="flex flex-row w-full h-full">
          <PlayerDetailLeftContent />
          <PlayerDetailRightContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}

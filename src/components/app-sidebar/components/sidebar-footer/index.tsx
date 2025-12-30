import { UserInfoState } from "@/atoms/user-atoms";
import { LoginDialog } from "@/components/login-dialog";
import { Button } from "@/components/ui/button";
import {
  SidebarFooter as Footer,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAtomValue } from "jotai";
import { Github, Settings } from "lucide-react";
import { ModeToggle } from "./theme-toggle";

const SidebarFooter = () => {
  const isLogin = useAtomValue(UserInfoState.isLogin);
  const accountProfile = useAtomValue(UserInfoState.accountProfile);
  return (
    <Footer>
      <SidebarMenuItem className="flex flex-row items-center">
        <div className="w-8 h-8 flex flex-row items-center gap-2">
          <img
            src={accountProfile?.avatarUrl}
            alt={accountProfile?.nickname}
            className="w-fit rounded-l-lg"
          ></img>
          <span className="text-sm font-medium text-foreground">
            {accountProfile?.nickname}
          </span>
        </div>
        <div className="gap-1 ml-auto">
          {!isLogin && <LoginDialog />}
          <Button variant={"ghost"}>
            <Settings />
          </Button>
          <ModeToggle />
          <Button
            variant={"ghost"}
            onClick={() => {
              window.open("https://github.com/echolet-music");
            }}
          >
            <Github />
          </Button>
        </div>
      </SidebarMenuItem>
    </Footer>
  );
};

export default SidebarFooter;

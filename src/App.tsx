import { RouterProvider } from "react-router";
import { router } from "./routers";
import { useAccount } from "./hooks/use-account";
import { useAudio } from "./hooks/use-audio";
import { useThemeProvider } from "./components/theme-provider";

const App = () => {
  useAccount();
  useAudio();
  useThemeProvider();

  return <RouterProvider router={router} />;
};

export default App;

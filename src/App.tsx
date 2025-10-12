import { RouterProvider } from "react-router";
import { router } from "./routers";
import { useAccount } from "./hooks/use-account";
import { useAudio } from "./hooks/use-audio";

const App = () => {
  useAccount();
  useAudio();
  return <RouterProvider router={router} />;
};

export default App;

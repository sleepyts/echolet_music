import { RouterProvider } from "react-router";
import { router } from "./routers";
import { useAccount } from "./hooks/use-account";
const App = () => {
  useAccount();
  return <RouterProvider router={router} />;
};

export default App;

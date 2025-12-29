import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import Home from "./pages/home";
import { PlaylistPage } from "./pages/playlist";
import { SearchPage } from "./pages/search";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,

    children: [
      {
        path: "home",
        Component: Home,
      },
      {
        path: "playlist/:id",
        Component: PlaylistPage,
      },
      {
        path: "search",
        Component: SearchPage,
      },
    ],
  },
]);

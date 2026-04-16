import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Landing } from "./components/Landing";
import { Onboarding } from "./components/Onboarding";
import { Recommendations } from "./components/Recommendations";
import { QuestDetail } from "./components/QuestDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: "onboarding", Component: Onboarding },
      { path: "recommendations", Component: Recommendations },
      { path: "quest/:questId", Component: QuestDetail },
    ],
  },
]);
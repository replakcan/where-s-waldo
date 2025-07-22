import LeaderBoard from "./routes/leaderboard";
import Gameboard from "./routes/gameboard";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Index from "./routes/index";

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "game",
        element: <Gameboard />,
      },
      {
        path: "leaderboard",
        element: <LeaderBoard />,
      },
    ],
  },
];

export default routes;

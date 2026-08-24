import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/common/loading/Loading";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";

const Home = lazy(() => import("../pages/Home"));
const repoName = import.meta.env.VITE_REPO_NAME ?? "";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <MainLayout />
        </Suspense>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  { basename: repoName ? `/${repoName}` : "/" }
);

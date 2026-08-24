import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/common/loading/Loading";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";

const Home = lazy(() => import("../pages/Home"));
const ProjectsPage = lazy(() => import("../pages/ProjectsPage"));
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

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
        { path: "projects", element: <ProjectsPage /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  { basename }
);

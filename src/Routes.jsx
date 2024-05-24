import { lazy } from "react";
import { Fragment, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingScreen from "./pages/utils/loadingScreen";
import PageLayout from "./pages/utils/layout";

const routesConfig = [
  {
    id: "home",
    path: "/",
    layout: PageLayout,
    component: lazy(() => import("src/pages/home/Home")),
  },
  {
    id: "calls",
    path: "/calls",
    layout: PageLayout,
    component: lazy(() => import("src/pages/calls/Calls")),
  },
  {
    id: "sales",
    path: "/sales",
    layout: PageLayout,
    component: lazy(() => import("src/pages/sales/Sales")),
  },
  {
    id: "satisfaction",
    path: "/satisfaction",
    layout: PageLayout,
    component: lazy(() => import("src/pages/satisfaction/Satisfaction")),
  },
  {
    id: "*",
    path: "*",
    layout: PageLayout,
    component: lazy(() => import("src/pages/utils/notFound")),
  },
];

const renderRoutes = (routes) =>
    routes ? (
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {routes.map((route) => {
            const Guard = route.guard || Fragment;
            const Layout = route.layout || Fragment;
            const Component = route.component;
            return (
              <Route
                key={route.id}
                path={route.path ?? ""}
                element={
                  <Guard>
                    <Layout>
                      {route.routes ? renderRoutes(route.routes) : <Component />}
                    </Layout>
                  </Guard>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    ) : null;
  
  const RenderRoutes = () => {
    return renderRoutes(routesConfig);
  };
  
  export default RenderRoutes;

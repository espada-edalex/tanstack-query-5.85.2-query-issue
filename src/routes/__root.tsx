/// <reference types="vite/client" />
import {
  createRootRouteWithContext,
  Outlet,
} from "@tanstack/react-router";

import { AppContext } from "~/@types/AppContext.ts"

export const Route = createRootRouteWithContext<AppContext>()({
  component: function RootComponent() {
    return (
      <Outlet />
    );
  },
  notFoundComponent: () => (
    <div className="bg-base-200 grid min-h-screen place-items-center p-4 text-center">
      <div>
        <h1 className="text-primary text-6xl font-bold">404</h1>
        <p className="text-base-content/80 mt-4 text-lg">
          Oops! Page Not Found.
        </p>
      </div>
    </div>
  ),
});

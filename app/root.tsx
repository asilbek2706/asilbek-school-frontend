import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  redirect,
  useLocation,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import type { ReactNode } from "react";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer";
import { Toaster } from "sonner";

const AUTH_COOKIE_NAME = "asilbek_auth";

const isAuthRoute = (pathname: string) =>
  pathname.startsWith("/login");

const hasAuthCookie = (cookieHeader: string | null) =>
  cookieHeader?.includes(`${AUTH_COOKIE_NAME}=1`) ?? false;

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  if (isAuthRoute(url.pathname)) {
    return null;
  }

  if (!hasAuthCookie(request.headers.get("Cookie"))) {
    throw redirect("/login");
  }

  return null;
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isAuthPage = isAuthRoute(location.pathname);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>

        <div className="flex flex-col min-h-screen">
          {!isAuthPage && <Navbar />}

          <main
            className={
              isAuthPage
                ? "flex-grow relative z-10"
                : "flex-grow container mx-auto px-4 py-8 relative z-10"
            }
          >
            {children}
          </main>

          {!isAuthPage && <Footer />}
        </div>

      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: "rgba(27, 13, 10, 0.92)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "#ffffff",
          },
        }}
      />

      <ScrollRestoration />
      <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

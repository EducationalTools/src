import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { ThemeProvider } from "@/components/theme-provider";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Hotkeys from "@/components/hotkeys";
import Search from "@/components/search";
import Settings from "@/components/settings";
import { Toaster } from "@/components/ui/sonner";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@/lib/auth-client";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";

export function meta({}: Route.MetaArgs) {
  return [{ title: "EduTools" }];
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

export function Layout({ children }: { children: React.ReactNode }) {
  const convex = new ConvexReactClient(
    import.meta.env.VITE_CONVEX_URL as string,
  );
  const navigate = useNavigate();

  const LinkComponent = ({
    href,
    ...props
  }: {
    href: string;
    className?: string;
    children: React.ReactNode;
  }) => <Link to={href} {...props} />;

  return (
    <html className="dark" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ConvexBetterAuthProvider client={convex} authClient={authClient}>
          <AuthUIProvider
            authClient={authClient}
            navigate={navigate}
            Link={LinkComponent}
            credentials={false}
            social={{
              providers: ["github"],
              signIn: (params) => {
                const currentUrl = new URL(window.location.href);
                const convexSiteUrl = new URL(
                  import.meta.env.VITE_CONVEX_SITE_URL,
                );

                const redirectUrl = new URL("/auth", convexSiteUrl);
                redirectUrl.searchParams.set(
                  "redirect",
                  `${currentUrl.protocol}//${currentUrl.host}${params.callbackURL || ""}`,
                );

                return authClient.signIn.social({
                  ...params,
                  callbackURL: redirectUrl.toString(),
                });
              },
            }}
          >
            <SidebarProvider>
              <AppSidebar />
              <main className="w-full">{children}</main>
            </SidebarProvider>
            <ScrollRestoration />
            <Scripts />
            <Hotkeys />
            <Search />
            <Settings />
            <Toaster />
          </AuthUIProvider>
        </ConvexBetterAuthProvider>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="edutools-ui-theme">
        <Outlet />
      </ThemeProvider>
    </>
  );
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

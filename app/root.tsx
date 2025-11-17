import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Hotkeys from "@/components/hotkeys";
import Search from "@/components/search";
import Settings from "@/components/settings";
import { Toaster } from "@/components/ui/sonner";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@/lib/auth-client";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import { useSettingsState, useUiState } from "@/lib/state";
import { themes } from "@/lib/themes/theme";

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
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    setBaseUrl(location.protocol + "//" + location.host);
  }, []);

  const theme = useSettingsState((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;

    Object.keys(themes).forEach((key) => {
      root.classList.remove(key);
    });

    root.classList.remove("dark");

    // if theme doesn't support selected mode
    if (!themes[theme.theme][theme.mode]) {
      // use supported mode
      if (!(theme.mode == "dark")) {
        root.classList.add("dark");
      }
    } else {
      if (theme.mode == "dark") {
        root.classList.add("dark");
      }
    }
  }, [theme]);

  const LinkComponent = ({
    href,
    ...props
  }: {
    href: string;
    className?: string;
    children: React.ReactNode;
  }) => <Link to={href} {...props} />;

  return (
    <html className="theme-default dark" lang="en">
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
              providers: ["github", "google", "discord"],
              signIn: (params) => {
                const convexSiteUrl = new URL(
                  import.meta.env.VITE_CONVEX_SITE_URL,
                );

                const redirectUrl = new URL("/auth", convexSiteUrl);
                redirectUrl.searchParams.set(
                  "redirect",
                  params.callbackURL || "",
                );

                return authClient.signIn.social({
                  ...params,
                  callbackURL: redirectUrl.toString(),
                });
              },
            }}
            deleteUser={true}
            optimistic={true}
            avatar={true}
            changeEmail={false}
            baseURL={baseUrl}
          >
            <SidebarProvider>
              <AppSidebar />
              <div className="flex flex-col w-full p-2 pt-0">
                <Header />
                <SidebarInset className="w-full rounded-md!">
                  <main className="w-full h-full">{children}</main>
                </SidebarInset>
              </div>
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
      <Outlet />
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

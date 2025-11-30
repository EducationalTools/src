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
import {
  useSettingsState,
  useUiState,
  useExperimentalFeatures,
} from "@/lib/state";
import { themes } from "@/lib/themes/themes";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Copy } from "lucide-react";
import { toast } from "sonner";

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
    import.meta.env.VITE_CONVEX_URL as string
  );
  const navigate = useNavigate();
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    setBaseUrl(location.protocol + "//" + location.host);
  }, []);

  const theme = useSettingsState((state) => state.theme);
  const experimentalFeatures = useExperimentalFeatures(
    (state) => state.enabled
  );

  const panicModeActivated = useUiState((state) => state.panicModeActivated);

  useEffect(() => {
    const root = window.document.documentElement;

    Object.keys(themes).forEach((key) => {
      root.classList.remove("theme-" + key);
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

    root.classList.add("theme-" + theme.theme);
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
                  import.meta.env.VITE_CONVEX_SITE_URL
                );

                const redirectUrl = new URL("/auth", convexSiteUrl);
                redirectUrl.searchParams.set(
                  "redirect",
                  params.callbackURL || ""
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
            {!panicModeActivated && (
              <SidebarProvider
                className={cn(!experimentalFeatures && "md:pl-2")}
              >
                <AppSidebar />
                <div
                  className={cn(
                    "flex flex-col w-full p-2 pt-0 md:pl-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:pl-2 duration-200"
                  )}
                >
                  <Header />
                  <SidebarInset className="w-full rounded-md! overflow-hidden">
                    <main className="w-full h-full relative">{children}</main>
                  </SidebarInset>
                </div>
              </SidebarProvider>
            )}
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
  let message = "Something went wrong";
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
    <main className="w-full h-full max-w-screen flex flex-col gap-2 items-center justify-center p-4">
      <div className="max-w-4xl flex flex-col gap-4 items-center justify-center">
        <h1 className="text-4xl text-center">{message}</h1>
        <p className="text-center">{details}</p>
        {stack && (
          <Dialog>
            <ButtonGroup>
              <Button variant="outline" asChild>
                <DialogTrigger>Technical Information</DialogTrigger>
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  navigator.clipboard
                    .writeText(stack || "")
                    .then(() => {
                      toast.success("Copied to clipboard");
                    })
                    .catch((error) => {
                      toast.error("Failed to copy to clipboard");
                    });
                }}
              >
                <Copy />
              </Button>
            </ButtonGroup>
            <DialogContent>
              {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                  <code>{stack}</code>
                </pre>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </main>
  );
}

import { getGmaeById } from "@/lib/gmaes";
import type { Route } from "./+types/play";
import { data } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Fullscreen,
  Keyboard,
  Maximize,
  RefreshCw,
  Scan,
  Share,
  Square,
} from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSidebar } from "@/components/ui/sidebar";
import { useExperimentalFeatures, useGmaeHistory } from "@/lib/state";

export async function clientLoader({ params }: Route.ActionArgs) {
  if (!params.id) throw data(null, { status: 404 });
  if (!getGmaeById(params.id)) throw data(null, { status: 404 });
}

export default function PlayPage(props: Route.ComponentProps) {
  const experimental = useExperimentalFeatures((state) => state.enabled);

  if (!experimental) return;
  return (
    <>
      <Play key={props.params.id} {...props} />
    </>
  );
}

export function Play({ params }: Route.ComponentProps) {
  const gmae = getGmaeById(params.id);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const sidebar = useSidebar();
  const [maximized, setMaximized] = useState(false);

  const addToHistory = useGmaeHistory((state) => state.addToHistory);

  useEffect(() => {
    if (gmae?.id) {
      addToHistory(gmae.id);
    }
  }, [gmae?.id]);

  return (
    <div className="w-full h-full flex flex-col gap-2 bg-sidebar">
      <iframe
        src={gmae?.url}
        ref={iframeRef}
        className="w-full h-full rounded-md fullscreen:rounded-none"
      ></iframe>
      {!maximized ? (
        <div className="flex flex-col md:flex-row gap-2 bg-card md:p-0 p-2">
          <div className="flex flex-col p-2">
            <p className="text-sm text-muted-foreground">{gmae?.category}</p>
            <h1 className="text-4xl font-extrabold tracking-tight">
              {gmae?.name}
            </h1>
            <p className="leading-7">{gmae?.description}</p>
          </div>
          <div className="grow"></div>
          <div className="flex flex-col gap-2 items-end">
            <ButtonGroup>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      iframeRef.current?.focus();
                      toast.success("Focused gmae");
                    }}
                  >
                    <Keyboard />
                    <span className="sr-only">Fix keyboard input</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Fix keyboard input</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      iframeRef.current?.contentWindow?.location.reload();
                    }}
                  >
                    <RefreshCw />
                    <span className="sr-only">Reload</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reload</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      const win = window.open("");

                      let frame = document.createElement("iframe");
                      frame.src = gmae?.url || "";
                      frame.style.width = "100%";
                      frame.style.height = "100%";
                      frame.style.border = "none";
                      win?.document.body.appendChild(frame);
                      if (win) {
                        win.document.body.style.margin = "0";
                        win.document.title = "Google";
                      }
                    }}
                  >
                    <ExternalLink />
                    <span className="sr-only">Open in new tab</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Open in new tab</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    onClick={() => {
                      sidebar.setOpen(false);
                      setMaximized(true);
                    }}
                    variant="outline"
                  >
                    <ChevronDown />
                    <span className="sr-only">Maximize</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Maximize</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    onClick={() => {
                      iframeRef.current?.requestFullscreen();
                      iframeRef.current?.focus();
                    }}
                  >
                    <Maximize />
                    <span className="sr-only">Fullscreen</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Fullscreen</TooltipContent>
              </Tooltip>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">
                <Bookmark />
                Save
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  const url = new URL(window.location.href);
                  url.searchParams.set("utm_medium", "share");
                  url.searchParams.set("utm_source", "edutools");
                  url.searchParams.set("utm_campaign", "play-page-share");
                  if (!navigator.canShare || !navigator.share) {
                    if (!navigator.clipboard) {
                      toast.error("Failed to share");
                      return;
                    }
                    navigator.clipboard.writeText(url.toString()).then(() => {
                      toast.success("Copied to clipboard");
                    });
                  } else {
                    navigator
                      .share({
                        url: url.toString(),
                      })
                      .catch((error) => {
                        if (error == "AbortError: Share canceled") return;
                        toast.error("Failed to share");
                      });
                  }
                }}
              >
                <Share />
                Share
              </Button>
            </ButtonGroup>
          </div>
        </div>
      ) : (
        <div className="p-2 md:py-0 flex flex-row">
          <h1 className="text-xl">{gmae?.name}</h1>
          <div className="grow"></div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              if (!sidebar.isMobile) sidebar.setOpen(true);
              setMaximized(false);
            }}
          >
            <ChevronUp />
          </Button>
        </div>
      )}
    </div>
  );
}

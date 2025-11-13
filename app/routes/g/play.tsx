import { getGmaeById } from "@/lib/gmaes";
import type { Route } from "./+types/play";
import { data } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
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
import { useRef } from "react";
import { toast } from "sonner";

export async function clientLoader({ params }: Route.ActionArgs) {
  if (!params.id) throw data(null, { status: 404 });
  if (!getGmaeById(params.id)) throw data(null, { status: 404 });
}

export default function Play({ params }: Route.ComponentProps) {
  const gmae = getGmaeById(params.id);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="w-full h-full flex flex-col p-2 md:pl-0 gap-2">
      <iframe
        src={gmae?.url}
        ref={iframeRef}
        className="w-full h-full rounded-lg fullscreen:rounded-none"
      ></iframe>
      <div className="flex flex-col md:flex-row gap-2 bg-card border rounded-lg p-2">
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
            <Button variant="outline">
              <Share />
              Share
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

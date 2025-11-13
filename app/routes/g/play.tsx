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

export async function clientLoader({ params }: Route.ActionArgs) {
  if (!params.id) throw data(null, { status: 404 });
  if (!getGmaeById(params.id)) throw data(null, { status: 404 });
}

export default function Play({ params }: Route.ComponentProps) {
  const gmae = getGmaeById(params.id);
  return (
    <div className="w-full h-full flex flex-col p-2 md:pl-0 gap-2">
      <iframe src={gmae?.url} className="w-full h-full rounded-lg"></iframe>
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
                <Button size="icon" variant="outline">
                  <Keyboard />
                  <span className="sr-only">Fix keyboard input</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Fix keyboard input</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline">
                  <RefreshCw />
                  <span className="sr-only">Reload</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reload</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline">
                  <ExternalLink />
                  <span className="sr-only">Open in new tab</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Open in new tab</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon">
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

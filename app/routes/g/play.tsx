import { getGmaeById } from "@/lib/gmaes";
import type { Route } from "./+types/play";
import { data } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  ExternalLink,
  Fullscreen,
  Maximize,
  RefreshCw,
  Share,
  Square,
} from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";

export async function clientLoader({ params }: Route.ActionArgs) {
  if (!params.id) throw data(null, { status: 404 });
  if (!getGmaeById(params.id)) throw data(null, { status: 404 });
}

export default function Play({ params }: Route.ComponentProps) {
  const gmae = getGmaeById(params.id);
  return (
    <div className="w-full h-full flex flex-col p-2 md:pl-0 gap-2">
      <iframe src={gmae?.url} className="w-full h-full rounded-lg"></iframe>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col p-2">
          <h1 className="text-4xl font-extrabold tracking-tight">
            {gmae?.name}
          </h1>
          <p className="leading-7">{gmae?.description}</p>
        </div>
        <div className="grow"></div>
        <ButtonGroup>
          <Button size="icon" variant="outline">
            <Share />
            <span className="sr-only">Share</span>
          </Button>
          <Button size="icon" variant="outline">
            <Bookmark />
            <span className="sr-only">Bookmark</span>
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="icon" variant="outline">
            <RefreshCw />
            <span className="sr-only">Refresh</span>
          </Button>
          <Button size="icon" variant="outline">
            <ExternalLink />
            <span className="sr-only">Open in new tab</span>
          </Button>
          <Button size="icon">
            <Maximize />
            <span className="sr-only">Fullscreen</span>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

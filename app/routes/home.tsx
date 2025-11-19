import { TOOLS } from "@/lib/tools";
import type { Route } from "./+types/home";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-card">
      <div className="w-full h-72 flex justify-center items-center">
        <h1 className="text-4xl">EduTools</h1>
      </div>
      <div className="p-4 rounded-lg rounded-b-none bg-background grid grid-cols-3">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">Tools</h2>
          {TOOLS.map((tool) => (
            <Button
              className="h-16 justify-start rounded-lg"
              variant="outline"
              size="lg"
              asChild
            >
              <Link to={`/tools/${tool.id}`} key={tool.id}>
                <tool.icon />
                <h2 className="text-xl">{tool.label}</h2>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

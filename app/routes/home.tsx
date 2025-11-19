import { TOOLS } from "@/lib/tools";
import type { Route } from "./+types/home";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";

export default function Home() {
  const sections = [
    {
      title: "Tools",
      icon: Wrench,
      items: TOOLS.map((tool) => ({ ...tool, href: `/tools/${tool.id}` })),
    },
  ];

  return (
    <div className="bg-card">
      <div className="w-full h-72 flex justify-center items-center">
        <h1 className="text-4xl">EduTools</h1>
      </div>
      <div className="p-4 rounded-lg rounded-b-none bg-background grid grid-cols-3 gap-4">
        {sections.map((section) => (
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl flex flex-row items-center gap-2">
              <section.icon />
              {section.title}
            </h2>
            {section.items.map((item) => (
              <Button
                className="h-16 justify-start rounded-lg"
                variant="outline"
                size="lg"
                asChild
              >
                <Link to={item.href} key={item.id}>
                  <item.icon />
                  <h2 className="text-xl">{item.label}</h2>
                </Link>
              </Button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

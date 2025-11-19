import { TOOLS } from "@/lib/tools";
import type { Route } from "./+types/home";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { History, Wrench } from "lucide-react";
import { useGmaeHistory } from "@/lib/state";
import { getGmaeById } from "@/lib/gmaes";

export default function Home() {
  const history = useGmaeHistory((state) => state.history);

  const sections: {
    title: string;
    icon: any;
    items: { href: string; label: string; icon?: any; id: string }[];
  }[] = [
    {
      title: "Tools",
      icon: Wrench,
      items: TOOLS.map((tool) => ({ ...tool, href: `/tools/${tool.id}` })),
    },
    {
      title: "History",
      icon: History,
      items: history
        .map((id) => {
          const gmae = getGmaeById(id);
          return {
            id,
            href: `/g/${gmae?.id}`,
            label: gmae?.name || "",
          };
        })
        .reverse()
        .slice(0, 20),
    },
  ];

  return (
    <div className="bg-card">
      <div className="w-full h-72 flex justify-center items-center mb-2 rounded-md">
        <h1 className="text-4xl">EduTools</h1>
      </div>
      <div className="p-4 rounded-lg rounded-b-none bg-background grid grid-cols-3 gap-2">
        {sections.map((section) => (
          <div className="flex flex-col gap-2" key={section.title}>
            <h2 className="text-2xl flex flex-row items-center gap-2">
              <section.icon />
              {section.title}
            </h2>
            {section.items.map((item) => (
              <Button
                key={item.id}
                className="h-16 justify-start rounded-lg"
                variant="outline"
                size="lg"
                asChild
              >
                <Link to={item.href}>
                  {item.icon && <item.icon />}
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

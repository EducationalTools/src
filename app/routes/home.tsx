import { TOOLS } from "@/lib/tools";
import type { Route } from "./+types/home";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  History,
  Wrench,
  ArrowRight,
  Star,
  Gamepad2,
  Trash2,
  X,
} from "lucide-react";
import {
  useGmaeHistory,
  useSavedGmaes,
  useExperimentalFeatures,
} from "@/lib/state";
import { getGmaeById } from "@/lib/gmaes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

export default function Home() {
  const experimentalFeatures = useExperimentalFeatures(
    (state) => state.enabled
  );
  const history = useGmaeHistory((state) => state.history);
  const removeFromHistory = useGmaeHistory((state) => state.removeFromHistory);
  const clearHistory = useGmaeHistory((state) => state.clearHistory);

  const saved = useSavedGmaes((state) => state.saved);
  const toggleSaved = useSavedGmaes((state) => state.toggleSaved);

  // Helper to get game details
  const getGameDetails = (id: string) => {
    const game = getGmaeById(id);
    return {
      id,
      href: `/g/${game?.id}`,
      label: game?.name || "Unknown Game",
      // You could add game icons here if available
    };
  };

  const recentHistory = experimentalFeatures
    ? history.slice().reverse().slice(0, 10).map(getGameDetails)
    : [];

  const savedGames = experimentalFeatures
    ? saved.slice().reverse().slice(0, 10).map(getGameDetails)
    : [];

  return (
    <div className="container mx-auto max-w-7xl p-4 space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            EduTools
          </h1>
        </div>
      </section>

      <div
        className={cn(
          "grid gap-6",
          experimentalFeatures
            ? "grid-cols-1 lg:grid-cols-3"
            : "grid-cols-1 lg:grid-cols-2"
        )}
      >
        {/* Tools Section */}
        <Card
          className={cn(
            "h-fit",
            experimentalFeatures ? "lg:col-span-1" : "lg:col-span-2"
          )}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" />
              Utilities
            </CardTitle>
            <CardDescription>Helpful tools for everyday tasks</CardDescription>
          </CardHeader>
          <CardContent
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2",
              !experimentalFeatures && "lg:grid-cols-3",
              experimentalFeatures && "max-h-[600px] overflow-y-auto"
            )}
          >
            {TOOLS.map((tool) => (
              <Button
                key={tool.id}
                variant="outline"
                className="justify-start h-auto py-3 px-4 w-full group hover:border-primary/50 transition-colors"
                asChild
              >
                <Link to={`/tools/${tool.id}`}>
                  <div className="flex items-center gap-3 w-full">
                    <div className="bg-primary/10 p-2 rounded-md group-hover:bg-primary/20 transition-colors">
                      {tool.icon && (
                        <tool.icon className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="flex flex-col items-start gap-0.5 flex-1 overflow-hidden">
                      <span className="font-medium truncate w-full text-left">
                        {tool.label}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </div>
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Main Content Area (History & Saved) */}
        {experimentalFeatures && (
          <div className="lg:col-span-2 space-y-6">
            {/* Saved Games */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-primary" />
                  Saved
                </CardTitle>
                <CardDescription>Your bookmarked items</CardDescription>
              </CardHeader>
              <CardContent>
                {savedGames.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {savedGames.map((item) => (
                      <div key={item.id} className="relative">
                        <Button
                          variant="secondary"
                          className="justify-start h-auto py-3 px-4 w-full pr-12"
                          asChild
                        >
                          <Link to={item.href}>
                            <div className="flex items-center gap-3 w-full">
                              <Button
                                variant="outline"
                                size="icon"
                                className="group"
                              >
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500/20 absolute group-hover:opacity-0 transition-opacity" />
                                <X
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleSaved(item.id);
                                  }}
                                  className="w-4 h-4 text-muted-foreground absolute opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                              </Button>
                              <span className="font-medium truncate flex-1 text-left">
                                {item.label}
                              </span>
                            </div>
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty className="min-h-[200px]">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Bookmark />
                      </EmptyMedia>
                      <EmptyTitle>No saved items</EmptyTitle>
                      <EmptyDescription>
                        Items you bookmark will appear here for quick access.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                )}
              </CardContent>
            </Card>

            {/* Recent History */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1.5">
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    History
                  </CardTitle>
                  <CardDescription>Recently accessed items</CardDescription>
                </div>
                {history.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive h-8 px-2"
                    onClick={clearHistory}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {recentHistory.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {recentHistory.map((item) => (
                      <div key={item.id} className="relative group">
                        <Button
                          variant="ghost"
                          className="justify-start h-auto py-3 px-4 w-full border border-transparent hover:border-border hover:bg-accent/50 transition-all pr-12"
                          asChild
                        >
                          <Link to={item.href}>
                            <div className="flex items-center gap-3 w-full">
                              <History className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium truncate flex-1 text-left">
                                {item.label}
                              </span>
                            </div>
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/10 hover:text-destructive"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeFromHistory(item.id);
                          }}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove from history</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty className="min-h-[200px]">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <History />
                      </EmptyMedia>
                      <EmptyTitle>No history</EmptyTitle>
                      <EmptyDescription>
                        Your recently visited items will show up here.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

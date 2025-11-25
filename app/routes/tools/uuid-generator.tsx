import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, Trash2, Fingerprint } from "lucide-react";
import { toast } from "sonner";

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [hyphens, setHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);

  const generateUuid = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      let uuid: string = crypto.randomUUID();

      if (!hyphens) {
        uuid = uuid.replace(/-/g, "");
      }

      if (uppercase) {
        uuid = uuid.toUpperCase();
      }

      newUuids.push(uuid);
    }
    setUuids(newUuids);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    toast.success("All UUIDs copied to clipboard");
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">UUID Generator</h1>
        <p className="text-muted-foreground text-lg">
          Generate Version 4 UUIDs (Universally Unique Identifiers).
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Settings */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
                <CardTitle>Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium leading-none">Quantity</label>
                  <Input
                    type="number"
                    min={1}
                    value={count}
                    onChange={(e) =>
                      setCount(Math.max(1, parseInt(e.target.value) || 1))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label
                    htmlFor="hyphens"
                    className="text-sm font-medium cursor-pointer leading-none"
                  >
                    Hyphens
                  </label>
                  <Checkbox
                    id="hyphens"
                    checked={hyphens}
                    onCheckedChange={(checked) =>
                      setHyphens(checked as boolean)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label
                    htmlFor="uppercase"
                    className="text-sm font-medium cursor-pointer leading-none"
                  >
                    Uppercase
                  </label>
                  <Checkbox
                    id="uppercase"
                    checked={uppercase}
                    onCheckedChange={(checked) =>
                      setUppercase(checked as boolean)
                    }
                  />
                </div>

                <Button className="w-full" size="lg" onClick={generateUuid}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Generate
                </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="md:col-span-2">
          <Card className="flex flex-col h-full min-h-[400px]">
            <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
                <CardTitle className="text-base">Generated UUIDs</CardTitle>
                <div className="flex gap-2">
                  {uuids.length > 0 && (
                    <>
                      <Button variant="outline" size="sm" onClick={copyAll} className="h-8 px-2 text-xs">
                        <Copy className="mr-2 h-3.5 w-3.5" /> Copy All
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setUuids([])}
                         className="h-8 w-8 p-0"
                         title="Clear"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden relative">
              {uuids.length > 0 ? (
                <div className="absolute inset-0 overflow-auto p-4 space-y-2">
                  {uuids.map((uuid, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between group p-2 rounded hover:bg-muted/50 transition-colors"
                    >
                      <code className="font-mono text-sm break-all text-foreground/90">
                        {uuid}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => copyToClipboard(uuid)}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                  <Fingerprint className="w-12 h-12 opacity-20" />
                  <p>Click Generate to create UUIDs</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

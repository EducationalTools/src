import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [hyphens, setHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);

  const generateUuid = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      let uuid = crypto.randomUUID();
      
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
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">UUID Generator</h1>
          <p className="text-muted-foreground mt-2">
            Generate Version 4 UUIDs (Universally Unique Identifiers)
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Settings */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-card border rounded-lg shadow-sm p-6 space-y-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Quantity</label>
                  <Input 
                     type="number" 
                     min={1} 
                     max={100} 
                     value={count} 
                     onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Hyphens</label>
                  <input 
                    type="checkbox" 
                    className="h-5 w-5 rounded border-input bg-background text-primary focus:ring-primary accent-primary cursor-pointer"
                    checked={hyphens} 
                    onChange={(e) => setHyphens(e.target.checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Uppercase</label>
                  <input 
                    type="checkbox" 
                    className="h-5 w-5 rounded border-input bg-background text-primary focus:ring-primary accent-primary cursor-pointer"
                    checked={uppercase} 
                    onChange={(e) => setUppercase(e.target.checked)}
                  />
                </div>

                <Button className="w-full" size="lg" onClick={generateUuid}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Generate
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="md:col-span-2">
            <div className="bg-card border rounded-lg shadow-sm p-6 min-h-[400px] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Generated UUIDs</h2>
                <div className="flex gap-2">
                  {uuids.length > 0 && (
                    <>
                      <Button variant="outline" size="sm" onClick={copyAll}>
                        <Copy className="mr-2 h-4 w-4" /> Copy All
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setUuids([])}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {uuids.length > 0 ? (
                <div className="bg-muted rounded-md p-4 flex-1 overflow-auto max-h-[600px] space-y-2">
                  {uuids.map((uuid, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <code className="font-mono text-sm break-all">{uuid}</code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => copyToClipboard(uuid)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  Click Generate to create UUIDs
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

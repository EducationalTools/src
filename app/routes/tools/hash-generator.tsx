import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiCopy, PiArrowClockwise, PiTrash, PiLock } from "react-icons/pi";
import { toast } from "sonner";

async function hashText(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const algorithms = [
    { value: "SHA-1", label: "SHA-1" },
    { value: "SHA-256", label: "SHA-256" },
    { value: "SHA-384", label: "SHA-384" },
    { value: "SHA-512", label: "SHA-512" },
  ];

  const generateHashes = async () => {
    if (!input) {
      toast.error("Please enter some text");
      return;
    }

    setLoading(true);
    const newHashes: Record<string, string> = {};

    for (const algo of algorithms) {
      try {
        const hash = await hashText(input, algo.value);
        newHashes[algo.value] = hash;
      } catch (error) {
        newHashes[algo.value] = "Error generating hash";
      }
    }

    setHashes(newHashes);
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const clear = () => {
    setInput("");
    setHashes({});
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Hash Generator
        </h1>
        <p className="text-muted-foreground text-lg">
          Generate cryptographic hashes using SHA algorithms.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Input Text</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter text to hash..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                generateHashes();
              }
            }}
            className="h-11"
          />
          <div className="flex gap-2">
            <Button
              onClick={generateHashes}
              disabled={loading || !input}
              className="h-11"
            >
              <PiArrowClockwise
                className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              Generate Hashes
            </Button>
            <Button variant="outline" onClick={clear} className="h-11">
              <PiTrash className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {Object.keys(hashes).length > 0 && (
        <div className="space-y-4">
          {algorithms.map((algo) => (
            <Card key={algo.value}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold flex items-center gap-2">
                    <PiLock className="w-4 h-4 text-muted-foreground" />
                    {algo.label}
                  </h3>
                  {hashes[algo.value] && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(hashes[algo.value])}
                      className="h-8 px-2 text-xs"
                    >
                      <PiCopy className="mr-2 h-3.5 w-3.5" /> Copy
                    </Button>
                  )}
                </div>
                <div className="bg-muted rounded-lg p-4 min-h-[60px] border relative group">
                  {hashes[algo.value] ? (
                    <code className="font-mono text-sm break-all text-foreground">
                      {hashes[algo.value]}
                    </code>
                  ) : (
                    <div className="text-muted-foreground text-sm italic">
                      Hash will appear here...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="bg-muted/50 border-none shadow-none">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">About Hash Functions</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Hash functions are one-way cryptographic functions that convert
            input data into a fixed-size string of characters. They are commonly
            used for data integrity verification, password storage, and digital
            signatures. SHA-256 and SHA-512 are widely used in modern
            applications.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

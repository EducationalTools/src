import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

// Simple ASCII art generator using figlet-like characters
const ASCII_CHARS = {
  simple: " .:-=+*#%@",
  blocks: " ░▒▓█",
  bars: " ▁▂▃▄▅▆▇█",
  dots: " ··●●",
};

function generateASCIIArt(text: string, style: keyof typeof ASCII_CHARS): string {
  if (!text) return "";

  const chars = ASCII_CHARS[style];
  let result = "";

  // Simple ASCII art generation
  const lines = text.toUpperCase().split("\n");
  for (const line of lines) {
    if (!line.trim()) {
      result += "\n";
      continue;
    }

    // Create a simple banner effect
    const border = chars[chars.length - 1].repeat(line.length + 4);
    result += border + "\n";
    result += `${chars[chars.length - 1]} ${line} ${chars[chars.length - 1]}\n`;
    result += border + "\n\n";
  }

  return result;
}

function generateBox(text: string): string {
  if (!text) return "";

  const lines = text.split("\n");
  const maxWidth = Math.max(...lines.map((l) => l.length));

  let result = "";
  const top = "┌" + "─".repeat(maxWidth + 2) + "┐\n";
  const bottom = "└" + "─".repeat(maxWidth + 2) + "┘\n";

  result += top;
  for (const line of lines) {
    const padded = line.padEnd(maxWidth);
    result += `│ ${padded} │\n`;
  }
  result += bottom;

  return result;
}

function generateBanner(text: string): string {
  if (!text) return "";

  const lines = text.split("\n");
  let result = "";

  for (const line of lines) {
    if (!line.trim()) {
      result += "\n";
      continue;
    }

    // Simple banner with stars
    const stars = "*".repeat(line.length + 4);
    result += `${stars}\n`;
    result += `* ${line} *\n`;
    result += `${stars}\n\n`;
  }

  return result;
}

export default function AsciiArt() {
  const [input, setInput] = useState("Hello World");
  const [output, setOutput] = useState("");
  const [style, setStyle] = useState<"simple" | "blocks" | "bars" | "dots">("simple");
  const [format, setFormat] = useState<"box" | "banner" | "art">("banner");

  const generate = () => {
    if (!input) {
      toast.error("Please enter some text");
      return;
    }

    let result = "";
    if (format === "box") {
      result = generateBox(input);
    } else if (format === "banner") {
      result = generateBanner(input);
    } else {
      result = generateASCIIArt(input, style);
    }

    setOutput(result);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const clear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ASCII Art Generator</h1>
          <p className="text-muted-foreground mt-2">
            Generate ASCII art from text
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Input</h2>
            <textarea
              className="w-full h-32 p-4 border rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to convert to ASCII art..."
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={format === "banner" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormat("banner")}
                >
                  Banner
                </Button>
                <Button
                  variant={format === "box" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormat("box")}
                >
                  Box
                </Button>
                <Button
                  variant={format === "art" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormat("art")}
                >
                  Art
                </Button>
              </div>
            </div>
            {format === "art" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Style</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={style === "simple" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStyle("simple")}
                  >
                    Simple
                  </Button>
                  <Button
                    variant={style === "blocks" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStyle("blocks")}
                  >
                    Blocks
                  </Button>
                  <Button
                    variant={style === "bars" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStyle("bars")}
                  >
                    Bars
                  </Button>
                  <Button
                    variant={style === "dots" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStyle("dots")}
                  >
                    Dots
                  </Button>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={generate}>Generate</Button>
              <Button variant="outline" onClick={clear}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Output</h2>
              {output && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(output)}
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
              )}
            </div>
            <div className="bg-muted rounded-md p-4 min-h-[300px]">
              <pre className="font-mono text-xs whitespace-pre-wrap break-all">
                {output || "Generated ASCII art will appear here..."}
              </pre>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-muted/50">
          <h3 className="text-lg font-semibold mb-2">About ASCII Art</h3>
          <p className="text-sm text-muted-foreground">
            ASCII art is a graphic design technique that uses printable characters
            from the ASCII standard to create images and text decorations. It's
            commonly used in text-based interfaces, documentation, and creative
            projects.
          </p>
        </Card>
      </div>
    </div>
  );
}


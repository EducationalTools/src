import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState({
    global: false,
    ignoreCase: false,
    multiline: false,
  });
  const [matches, setMatches] = useState<RegExpMatchArray | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testRegex = () => {
    if (!pattern) {
      setError("Please enter a regex pattern");
      setMatches(null);
      return;
    }

    try {
      setError(null);
      let flagString = "";
      if (flags.global) flagString += "g";
      if (flags.ignoreCase) flagString += "i";
      if (flags.multiline) flagString += "m";

      const regex = new RegExp(pattern, flagString);
      const result = testString.match(regex);
      setMatches(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid regex pattern");
      setMatches(null);
    }
  };

  const highlightMatches = (text: string, regex: RegExp): string => {
    if (!pattern || !text) return text;

    try {
      const parts: string[] = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(text)) !== null) {
        parts.push(text.substring(lastIndex, match.index));
        parts.push(`<mark class="bg-yellow-300 dark:bg-yellow-600">${match[0]}</mark>`);
        lastIndex = regex.lastIndex;

        if (!flags.global) break;
      }

      parts.push(text.substring(lastIndex));
      return parts.join("");

      // Reset regex for next use
    } catch {
      return text;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const clear = () => {
    setPattern("");
    setTestString("");
    setMatches(null);
    setError(null);
  };

  let highlightedText = testString;
  if (pattern && testString && !error) {
    try {
      let flagString = "";
      if (flags.global) flagString += "g";
      if (flags.ignoreCase) flagString += "i";
      if (flags.multiline) flagString += "m";
      const regex = new RegExp(pattern, flagString);
      highlightedText = highlightMatches(testString, regex);
    } catch {
      // Ignore errors in highlighting
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Regex Tester</h1>
          <p className="text-muted-foreground mt-2">
            Test and debug regular expressions in real-time
          </p>
        </div>

        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Regular Expression Pattern</h2>
          <Input
            placeholder="Enter regex pattern (e.g., /hello/i or hello)"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="font-mono"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                testRegex();
              }
            }}
          />
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="global"
                checked={flags.global}
                onCheckedChange={(checked) =>
                  setFlags({ ...flags, global: checked as boolean })
                }
              />
              <label htmlFor="global" className="text-sm font-medium cursor-pointer">
                Global (g)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ignoreCase"
                checked={flags.ignoreCase}
                onCheckedChange={(checked) =>
                  setFlags({ ...flags, ignoreCase: checked as boolean })
                }
              />
              <label htmlFor="ignoreCase" className="text-sm font-medium cursor-pointer">
                Ignore Case (i)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="multiline"
                checked={flags.multiline}
                onCheckedChange={(checked) =>
                  setFlags({ ...flags, multiline: checked as boolean })
                }
              />
              <label htmlFor="multiline" className="text-sm font-medium cursor-pointer">
                Multiline (m)
              </label>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Test String</h2>
            <Button variant="ghost" size="sm" onClick={clear}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <textarea
            className="w-full h-32 p-4 border rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against the regex pattern..."
          />
          <Button onClick={testRegex}>Test Regex</Button>
        </Card>

        {error && (
          <Card className="p-6 border-destructive bg-destructive/10">
            <div className="text-destructive font-semibold">Error</div>
            <div className="text-sm mt-1">{error}</div>
          </Card>
        )}

        {matches && (
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Matches ({matches.length})
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(JSON.stringify(matches, null, 2))}
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy Results
                </Button>
              </div>
              <div className="bg-muted rounded-md p-4 space-y-2 max-h-64 overflow-auto">
                {matches.map((match, index) => (
                  <div key={index} className="font-mono text-sm">
                    [{index}]: {match}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {testString && pattern && !error && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Highlighted Text</h3>
            <div className="bg-muted rounded-md p-4 min-h-[100px]">
              <div
                className="font-mono text-sm whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: highlightedText }}
              />
            </div>
          </Card>
        )}

        <Card className="p-6 bg-muted/50">
          <h3 className="text-lg font-semibold mb-2">Common Regex Patterns</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm font-mono">
            <div>
              <div className="font-semibold mb-1">Email</div>
              <div className="text-muted-foreground">
                [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">URL</div>
              <div className="text-muted-foreground">
                https?://[^\s]+
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">Phone</div>
              <div className="text-muted-foreground">
                \d{3}-\d{3}-\d{4}
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">Numbers</div>
              <div className="text-muted-foreground">
                \d+
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}


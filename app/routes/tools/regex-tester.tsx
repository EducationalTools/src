import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";
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
        parts.push(`<mark class="bg-yellow-300 dark:bg-yellow-600 rounded-sm px-0.5">${match[0]}</mark>`);
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
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Regex Tester</h1>
        <p className="text-muted-foreground text-lg">
          Test and debug regular expressions in real-time.
        </p>
      </div>

      <Card>
        <CardHeader>
             <CardTitle>Pattern</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4 flex-col sm:flex-row">
              <div className="flex-1">
                <Input
                    placeholder="Enter regex pattern (e.g., /hello/i or hello)"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className="font-mono h-11"
                    onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        testRegex();
                    }
                    }}
                />
              </div>
              <Button onClick={testRegex} className="h-11 px-8">Test</Button>
          </div>
          
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="global"
                checked={flags.global}
                onCheckedChange={(checked) =>
                  setFlags({ ...flags, global: checked as boolean })
                }
              />
              <label htmlFor="global" className="text-sm font-medium cursor-pointer leading-none">
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
              <label htmlFor="ignoreCase" className="text-sm font-medium cursor-pointer leading-none">
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
              <label htmlFor="multiline" className="text-sm font-medium cursor-pointer leading-none">
                Multiline (m)
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
             <CardTitle className="text-base">Test String</CardTitle>
             <Button variant="ghost" size="sm" onClick={clear} className="h-8 px-2 text-xs">
                <RefreshCw className="h-3.5 w-3.5 mr-1" /> Clear
             </Button>
          </CardHeader>
          <CardContent className="p-0">
             <textarea
                className="w-full h-32 p-4 border-none bg-transparent font-mono text-sm resize-y focus:outline-none"
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Enter text to test against the regex pattern..."
            />
          </CardContent>
        </Card>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center gap-3 text-destructive">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <div className="font-medium">{error}</div>
          </div>
        )}

        {matches && (
          <Card>
             <CardHeader className="flex flex-row items-center justify-between py-4 border-b bg-muted/30">
                 <CardTitle className="text-base flex items-center gap-2">
                     <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Matches ({matches.length})
                 </CardTitle>
                 <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(JSON.stringify(matches, null, 2))}
                  className="h-8 px-2 text-xs"
                >
                  <Copy className="mr-2 h-3.5 w-3.5" /> Copy Results
                </Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="bg-muted/30 p-4 space-y-2 max-h-64 overflow-auto font-mono text-sm">
                {matches.map((match, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="text-muted-foreground w-8 text-right select-none">[{index}]</span>
                    <span className="break-all">{match}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {testString && pattern && !error && (
          <Card>
            <CardHeader className="py-4 border-b">
                 <CardTitle className="text-base">Highlighted Text</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div
                className="font-mono text-sm whitespace-pre-wrap break-words"
                dangerouslySetInnerHTML={{ __html: highlightedText }}
              />
            </CardContent>
          </Card>
        )}
      </div>

       <Card className="bg-muted/50 border-none shadow-none">
          <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Common Regex Patterns</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <div className="font-medium mb-1.5">Email</div>
              <div className="p-2 rounded bg-background border font-mono text-xs text-muted-foreground break-all">
                {'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'}
              </div>
            </div>
            <div>
              <div className="font-medium mb-1.5">URL</div>
              <div className="p-2 rounded bg-background border font-mono text-xs text-muted-foreground break-all">
                https?://[^\s]+
              </div>
            </div>
            <div>
              <div className="font-medium mb-1.5">Phone (US)</div>
               <div className="p-2 rounded bg-background border font-mono text-xs text-muted-foreground break-all">
                \d{3}-\d{3}-\d{4}
              </div>
            </div>
            <div>
              <div className="font-medium mb-1.5">Integers</div>
               <div className="p-2 rounded bg-background border font-mono text-xs text-muted-foreground break-all">
                \d+
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

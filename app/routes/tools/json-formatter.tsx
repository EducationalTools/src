import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Trash2, AlertCircle, CheckCircle2, ClipboardPaste, FileJson, Minimize2, AlignLeft } from "lucide-react";
import { toast } from "sonner";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentation, setIndentation] = useState(2);

  const formatJson = () => {
    if (!input.trim()) {
      setError("");
      setOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indentation));
      setError("");
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  };

  const minifyJson = () => {
    if (!input.trim()) return;

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("JSON copied to clipboard");
  };

  const pasteInput = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      // Auto-format on paste if empty
      if (!input) {
        try {
            const parsed = JSON.parse(text);
            setOutput(JSON.stringify(parsed, null, indentation));
            setError("");
        } catch {
            // Ignore parse error on paste, let user fix
        }
      }
    } catch (err) {
      toast.error("Failed to paste from clipboard");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-[1600px] h-[calc(100vh-4rem)] flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">JSON Formatter & Validator</h1>
        <p className="text-muted-foreground text-lg">
          Format, validate, and minify JSON data
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0 pb-6">
        {/* Input Section */}
        <Card className="flex flex-col min-h-0 h-full shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 px-4 border-b">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                    <FileJson className="w-4 h-4" />
                    Input JSON
                </CardTitle>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={pasteInput} className="h-8 px-2 text-xs">
                        <ClipboardPaste className="w-3.5 h-3.5 mr-1" />
                        Paste
                    </Button>
                    <Button variant="ghost" size="sm" onClick={clearAll} className="h-8 px-2 text-xs hover:text-destructive">
                        <Trash2 className="w-3.5 h-3.5 mr-1" />
                        Clear
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 min-h-0 relative">
                <textarea
                    className="absolute inset-0 w-full h-full p-4 bg-transparent font-mono text-sm resize-none focus:outline-none focus:ring-0"
                    placeholder="Paste your JSON here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="flex flex-col min-h-0 h-full shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 px-4 border-b">
                <div className="flex items-center gap-4">
                     <CardTitle className="text-base font-medium">Output</CardTitle>
                     {error && (
                        <span className="text-xs text-destructive flex items-center gap-1 bg-destructive/10 px-2 py-0.5 rounded-full">
                            <AlertCircle className="h-3 w-3" /> Invalid JSON
                        </span>
                    )}
                    {output && !error && (
                        <span className="text-xs text-green-600 flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="h-3 w-3" /> Valid JSON
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-muted rounded-md border p-0.5 h-8">
                         <Button
                            variant={indentation === 2 ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => { setIndentation(2); if (output && !error) formatJson(); }}
                            className="h-6 px-2 text-xs"
                        >
                            2 Spaces
                        </Button>
                        <Button
                            variant={indentation === 4 ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => { setIndentation(4); if (output && !error) formatJson(); }}
                            className="h-6 px-2 text-xs"
                        >
                            4 Spaces
                        </Button>
                    </div>
                    
                    <Button variant="outline" size="icon" onClick={minifyJson} className="h-8 w-8" title="Minify">
                        <Minimize2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={formatJson} className="h-8 w-8" title="Format">
                        <AlignLeft className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="default" size="sm" onClick={copyOutput} disabled={!output} className="h-8 text-xs">
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        Copy
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 min-h-0 relative">
                 {error ? (
                    <div className="absolute inset-0 w-full h-full p-4 bg-destructive/5 font-mono text-sm text-destructive overflow-auto">
                        {error}
                    </div>
                ) : (
                    <textarea
                        className="absolute inset-0 w-full h-full p-4 bg-muted/30 font-mono text-sm resize-none focus:outline-none focus:ring-0"
                        placeholder="Formatted JSON will appear here..."
                        value={output}
                        readOnly
                    />
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

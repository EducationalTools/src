import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Trash2, FileJson, AlertCircle, CheckCircle2 } from "lucide-react";
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
    <div className="container mx-auto p-6 max-w-[1600px]">
      <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">JSON Formatter & Validator</h1>
          <p className="text-muted-foreground mt-2">
            Format, validate, and minify JSON data
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
          {/* Input Section */}
          <div className="flex flex-col gap-4 h-full min-h-0">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Input JSON</label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={pasteInput}>
                  Paste
                </Button>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <textarea
              className="flex-1 w-full p-4 rounded-lg border bg-card font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Paste your JSON here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* Output Section */}
          <div className="flex flex-col gap-4 h-full min-h-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Output</label>
                {error && (
                  <span className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Invalid JSON
                  </span>
                )}
                {output && !error && (
                   <span className="text-xs text-green-500 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Valid JSON
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <div className="flex border rounded-md overflow-hidden mr-2">
                    <button 
                        className={`px-3 py-1 text-xs ${indentation === 2 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                        onClick={() => { setIndentation(2); if (output && !error) formatJson(); }}
                    >
                        2 Spaces
                    </button>
                    <button 
                        className={`px-3 py-1 text-xs ${indentation === 4 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                        onClick={() => { setIndentation(4); if (output && !error) formatJson(); }}
                    >
                        4 Spaces
                    </button>
                </div>
                <Button variant="outline" size="sm" onClick={minifyJson}>
                  Minify
                </Button>
                <Button variant="default" size="sm" onClick={formatJson}>
                  Format
                </Button>
                 <Button variant="outline" size="icon" onClick={copyOutput} disabled={!output}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {error ? (
              <div className="flex-1 w-full p-4 rounded-lg border border-destructive/50 bg-destructive/5 font-mono text-sm text-destructive overflow-auto">
                {error}
              </div>
            ) : (
              <textarea
                className="flex-1 w-full p-4 rounded-lg border bg-muted font-mono text-sm resize-none focus:outline-none"
                placeholder="Formatted JSON will appear here..."
                value={output}
                readOnly
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


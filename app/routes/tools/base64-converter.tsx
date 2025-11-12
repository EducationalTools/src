import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Base64Converter() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      setError("");
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (err) {
      setError("Failed to encode. Make sure the input contains valid characters.");
      setOutput("");
    }
  };

  const handleDecode = () => {
    try {
      setError("");
      const decoded = atob(input);
      setOutput(decoded);
    } catch (err) {
      setError("Failed to decode. Make sure the input is valid Base64.");
      setOutput("");
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setError("Please enter some text");
      setOutput("");
      return;
    }

    if (mode === "encode") {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  };

  const handleSwap = () => {
    setInput(output);
    setOutput(input);
    setMode(mode === "encode" ? "decode" : "encode");
    setError("");
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setError("");
    } catch (err) {
      console.error("Failed to paste:", err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Base64 Converter
          </h1>
          <p className="text-muted-foreground mt-2">
            Encode or decode Base64 strings
          </p>
        </div>

        <div className="bg-card border rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            {/* Mode Toggle */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={mode === "encode" ? "default" : "outline"}
                onClick={() => {
                  setMode("encode");
                  setError("");
                  setCopied(false);
                }}
                size="lg"
              >
                Encode
              </Button>
              <Button
                variant={mode === "decode" ? "default" : "outline"}
                onClick={() => {
                  setMode("decode");
                  setError("");
                  setCopied(false);
                }}
                size="lg"
              >
                Decode
              </Button>
            </div>

            {/* Input Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">
                  {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
                </label>
                <Button variant="outline" size="sm" onClick={pasteFromClipboard}>
                  Paste
                </Button>
              </div>
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError("");
                  setCopied(false);
                }}
                placeholder={
                  mode === "encode"
                    ? "Enter text to encode..."
                    : "Enter Base64 string to decode..."
                }
                className="w-full min-h-[200px] p-4 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y font-mono"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleConvert}
                className="flex-1 h-12 text-base"
                size="lg"
              >
                {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12"
                onClick={handleSwap}
                disabled={!output}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 10L2 15l5 5" />
                  <path d="M2 15h20" />
                  <path d="M17 14l5-5-5-5" />
                  <path d="M22 9H2" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12"
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <p className="text-sm text-destructive font-medium">{error}</p>
              </div>
            )}

            {/* Output Section */}
            {output && !error && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">
                    {mode === "encode" ? "Base64 Output" : "Decoded Text"}
                  </label>
                  <Button
                    variant={copied ? "default" : "outline"}
                    size="sm"
                    onClick={copyToClipboard}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <div className="bg-muted rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap break-all">
                    {output}
                  </pre>
                </div>
                <div className="text-xs text-muted-foreground text-right">
                  {output.length} characters
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-muted/50 border rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-2">What is Base64?</h3>
          <p className="text-sm text-muted-foreground">
            Base64 is a binary-to-text encoding scheme that represents binary data in
            an ASCII string format. It's commonly used for encoding data in emails,
            URLs, and data URIs.
          </p>
        </div>
      </div>
    </div>
  );
}

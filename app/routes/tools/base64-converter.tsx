import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  PiCopy,
  PiArrowsLeftRight,
  PiTrash,
  PiClipboard,
} from "react-icons/pi";

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
      setError(
        "Failed to encode. Make sure the input contains valid characters."
      );
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
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Base64 Converter
        </h1>
        <p className="text-muted-foreground text-lg">
          Encode text to Base64 format or decode Base64 strings.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Mode Toggle */}
          <div className="flex p-1 bg-muted rounded-lg w-fit">
            <Button
              variant={mode === "encode" ? "default" : "ghost"}
              onClick={() => {
                setMode("encode");
                setError("");
                setCopied(false);
              }}
              size="sm"
              className="w-32"
            >
              Encode
            </Button>
            <Button
              variant={mode === "decode" ? "default" : "ghost"}
              onClick={() => {
                setMode("decode");
                setError("");
                setCopied(false);
              }}
              size="sm"
              className="w-32"
            >
              Decode
            </Button>
          </div>

          {/* Input Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={pasteFromClipboard}
                className="h-8 px-2 text-xs"
              >
                <PiClipboard className="w-3.5 h-3.5 mr-1" />
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
              className="flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono resize-y"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleConvert} className="flex-1 h-11 text-base">
              {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 shrink-0"
              onClick={handleSwap}
              disabled={!output}
              title="Swap Input/Output"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-11 shrink-0"
              onClick={handleClear}
            >
              <PiTrash className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-sm text-destructive font-medium">
              {error}
            </div>
          )}

          {/* Output Section */}
          {output && !error && (
            <div className="space-y-3 pt-4 border-t">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {mode === "encode" ? "Base64 Output" : "Decoded Text"}
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {output.length} chars
                  </span>
                  <Button
                    variant={copied ? "default" : "outline"}
                    size="sm"
                    onClick={copyToClipboard}
                    className="h-8 px-2 text-xs"
                  >
                    <PiCopy className="w-3.5 h-3.5 mr-1" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>
              <div className="bg-muted rounded-lg p-4 min-h-[100px] max-h-[400px] overflow-y-auto border">
                <pre className="text-sm font-mono whitespace-pre-wrap break-all">
                  {output}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Section */}
      <Card className="bg-muted/50 border-none shadow-none">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">What is Base64?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Base64 is a binary-to-text encoding scheme that represents binary
            data in an ASCII string format. It's commonly used for encoding data
            in emails, URLs, and data URIs to ensure that the data remains
            intact without modification during transport.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

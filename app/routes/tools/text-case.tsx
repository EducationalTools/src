import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, CaseUpper, CaseLower, Type } from "lucide-react";
import { toast } from "sonner";

type CaseType =
  | "lowercase"
  | "uppercase"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "constant";

function convertCase(text: string, caseType: CaseType): string {
  if (!text) return "";

  switch (caseType) {
    case "lowercase":
      return text.toLowerCase();
    case "uppercase":
      return text.toUpperCase();
    case "title":
      return text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    case "sentence":
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case "camel":
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[A-Z]/, (chr) => chr.toLowerCase());
    case "pascal":
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[a-z]/, (chr) => chr.toUpperCase());
    case "snake":
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
    case "kebab":
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    case "constant":
      return text
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
    default:
      return text;
  }
}

export default function TextCase() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [selectedCase, setSelectedCase] = useState<CaseType>("lowercase");

  const caseTypes: { value: CaseType; label: string; description: string }[] = [
    { value: "lowercase", label: "lowercase", description: "all lowercase" },
    { value: "uppercase", label: "UPPERCASE", description: "ALL UPPERCASE" },
    { value: "title", label: "Title Case", description: "Title Case" },
    { value: "sentence", label: "Sentence case", description: "Sentence case" },
    { value: "camel", label: "camelCase", description: "camelCase" },
    { value: "pascal", label: "PascalCase", description: "PascalCase" },
    { value: "snake", label: "snake_case", description: "snake_case" },
    { value: "kebab", label: "kebab-case", description: "kebab-case" },
    { value: "constant", label: "CONSTANT_CASE", description: "CONSTANT_CASE" },
  ];

  const handleInputChange = (value: string) => {
    setInput(value);
    setOutput(convertCase(value, selectedCase));
  };

  const handleCaseChange = (caseType: CaseType) => {
    setSelectedCase(caseType);
    setOutput(convertCase(input, caseType));
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
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Text Case Converter
        </h1>
        <p className="text-muted-foreground text-lg">
          Convert text between different case formats.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
             <CardHeader>
                <CardTitle>Case Type</CardTitle>
             </CardHeader>
            <CardContent className="space-y-2">
              {caseTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={selectedCase === type.value ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start h-auto py-2 px-3"
                  onClick={() => handleCaseChange(type.value)}
                >
                  <div className="text-left">
                    <div className="font-medium">{type.label}</div>
                    <div className="text-xs opacity-70">
                      {type.description}
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
                <CardTitle className="text-base">Input</CardTitle>
                 <Button variant="ghost" size="sm" onClick={clear} className="h-8 px-2 text-xs">
                  <RefreshCw className="h-3.5 w-3.5 mr-1" /> Clear
                </Button>
            </CardHeader>
            <CardContent className="p-0">
              <textarea
                placeholder="Enter text to convert..."
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full h-32 p-4 border-none bg-transparent font-mono text-sm resize-y focus:outline-none"
              />
            </CardContent>
          </Card>

          <Card className="flex flex-col">
             <CardHeader className="flex flex-row items-center justify-between py-4 border-b bg-muted/30">
                <CardTitle className="text-base">Output</CardTitle>
                {output && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(output)}
                     className="h-8 px-2 text-xs"
                  >
                    <Copy className="mr-2 h-3.5 w-3.5" /> Copy
                  </Button>
                )}
            </CardHeader>
            <CardContent className="p-4 min-h-[120px] bg-muted/30">
              <div className="font-mono break-words whitespace-pre-wrap text-sm">
                {output || <span className="text-muted-foreground italic">Converted text will appear here...</span>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

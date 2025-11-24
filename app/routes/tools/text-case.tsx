import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Copy, RefreshCw } from "lucide-react";
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
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Text Case Converter
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert text between different case formats
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="p-6">
              <h2 className="text-lg font-semibold">Case Type</h2>
              <div className="space-y-2">
                {caseTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={
                      selectedCase === type.value ? "default" : "outline"
                    }
                    size="lg"
                    className="w-full justify-start p-4 h-fit"
                    onClick={() => handleCaseChange(type.value)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{type.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {type.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-4">
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Input</h2>
                <Button variant="ghost" size="sm" onClick={clear}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <Input
                placeholder="Enter text to convert..."
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                className="font-mono"
              />
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
              <div className="bg-muted rounded-md p-4 min-h-[100px]">
                <div className="font-mono break-words whitespace-pre-wrap">
                  {output || "Converted text will appear here..."}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

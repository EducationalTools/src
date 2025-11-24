import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

function convertBase(value: string, fromBase: number, toBase: number): string {
  try {
    // Remove any prefix if present
    let cleanValue = value.trim();
    if (cleanValue.startsWith("0x") || cleanValue.startsWith("0X")) {
      cleanValue = cleanValue.slice(2);
    } else if (cleanValue.startsWith("0b") || cleanValue.startsWith("0B")) {
      cleanValue = cleanValue.slice(2);
    } else if (cleanValue.startsWith("0o") || cleanValue.startsWith("0O")) {
      cleanValue = cleanValue.slice(2);
    }

    // Convert to decimal first
    const decimal = parseInt(cleanValue, fromBase);
    if (isNaN(decimal)) {
      return "Invalid";
    }

    // Convert from decimal to target base
    if (toBase === 10) {
      return decimal.toString();
    }

    return decimal.toString(toBase).toUpperCase();
  } catch {
    return "Invalid";
  }
}

export default function NumberBase() {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState(10);
  const [results, setResults] = useState<Record<number, string>>({});

  const bases = [
    { value: 2, label: "Binary", prefix: "0b" },
    { value: 8, label: "Octal", prefix: "0o" },
    { value: 10, label: "Decimal", prefix: "" },
    { value: 16, label: "Hexadecimal", prefix: "0x" },
  ];

  const handleInputChange = (value: string) => {
    setInput(value);
    if (value) {
      const newResults: Record<number, string> = {};
      bases.forEach((base) => {
        if (base.value !== fromBase) {
          newResults[base.value] = convertBase(value, fromBase, base.value);
        } else {
          newResults[base.value] = value;
        }
      });
      setResults(newResults);
    } else {
      setResults({});
    }
  };

  const handleBaseChange = (base: number) => {
    setFromBase(base);
    if (input) {
      const newResults: Record<number, string> = {};
      bases.forEach((b) => {
        if (b.value !== base) {
          newResults[b.value] = convertBase(input, base, b.value);
        } else {
          newResults[b.value] = input;
        }
      });
      setResults(newResults);
    }
  };

  const copyToClipboard = (text: string, prefix: string) => {
    navigator.clipboard.writeText(prefix + text);
    toast.success("Copied to clipboard");
  };

  const clear = () => {
    setInput("");
    setResults({});
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Number Base Converter</h1>
          <p className="text-muted-foreground mt-2">
            Convert numbers between binary, octal, decimal, and hexadecimal
          </p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">From Base</label>
            <div className="grid grid-cols-4 gap-2">
              {bases.map((base) => (
                <Button
                  key={base.value}
                  variant={fromBase === base.value ? "default" : "outline"}
                  onClick={() => handleBaseChange(base.value)}
                >
                  {base.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Input Number</label>
            <Input
              placeholder={`Enter ${bases.find((b) => b.value === fromBase)?.label.toLowerCase()} number...`}
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              className="font-mono text-lg"
            />
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          {bases
            .filter((base) => base.value !== fromBase)
            .map((base) => (
              <Card key={base.value} className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{base.label}</h3>
                  {results[base.value] && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(results[base.value], base.prefix)
                      }
                    >
                      <Copy className="mr-2 h-4 w-4" /> Copy
                    </Button>
                  )}
                </div>
                <div className="bg-muted rounded-md p-4 min-h-[60px]">
                  {results[base.value] ? (
                    <div className="font-mono text-lg break-all">
                      {base.prefix}
                      {results[base.value]}
                    </div>
                  ) : (
                    <div className="text-muted-foreground">
                      Converted value will appear here...
                    </div>
                  )}
                </div>
              </Card>
            ))}
        </div>

        <div className="flex justify-center">
          <Button variant="ghost" onClick={clear}>
            <RefreshCw className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>

        <Card className="p-6 bg-muted/50">
          <h3 className="text-lg font-semibold mb-2">Number Base Guide</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold mb-1">Binary (Base 2)</div>
              <div className="text-muted-foreground">
                Uses digits 0-1. Example: 1010 = 10 in decimal
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">Octal (Base 8)</div>
              <div className="text-muted-foreground">
                Uses digits 0-7. Example: 12 = 10 in decimal
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">Decimal (Base 10)</div>
              <div className="text-muted-foreground">
                Uses digits 0-9. Standard number system
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">Hexadecimal (Base 16)</div>
              <div className="text-muted-foreground">
                Uses digits 0-9 and A-F. Example: A = 10 in decimal
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}


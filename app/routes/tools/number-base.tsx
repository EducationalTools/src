import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, ArrowRightLeft, Binary } from "lucide-react";
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
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Number Base Converter</h1>
        <p className="text-muted-foreground text-lg">
          Convert numbers between binary, octal, decimal, and hexadecimal.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-3">
             <label className="text-sm font-medium leading-none">From Base</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {bases.map((base) => (
                <Button
                  key={base.value}
                  variant={fromBase === base.value ? "default" : "outline"}
                  onClick={() => handleBaseChange(base.value)}
                  className="w-full"
                >
                  {base.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium leading-none">Input Number</label>
                 <Button variant="ghost" size="sm" onClick={clear} className="h-8 px-2 text-xs">
                    <RefreshCw className="mr-2 h-3.5 w-3.5" /> Clear
                </Button>
            </div>
            <Input
              placeholder={`Enter ${bases.find((b) => b.value === fromBase)?.label.toLowerCase()} number...`}
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              className="font-mono text-lg h-12"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {bases
          .filter((base) => base.value !== fromBase)
          .map((base) => (
            <Card key={base.value} className="overflow-hidden">
               <CardHeader className="flex flex-row items-center justify-between py-4 bg-muted/30 border-b">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                      <Binary className="w-4 h-4 text-muted-foreground" />
                      {base.label}
                  </CardTitle>
                   {results[base.value] && results[base.value] !== "Invalid" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(results[base.value], base.prefix)
                    }
                     className="h-8 px-2 text-xs"
                  >
                    <Copy className="mr-2 h-3.5 w-3.5" /> Copy
                  </Button>
                )}
               </CardHeader>
              <CardContent className="p-6">
                <div className="min-h-[30px] flex items-center">
                  {results[base.value] ? (
                    <div className={`font-mono text-lg break-all ${results[base.value] === "Invalid" ? "text-destructive" : ""}`}>
                       {results[base.value] !== "Invalid" && <span className="text-muted-foreground opacity-50 mr-1">{base.prefix}</span>}
                      {results[base.value]}
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm italic">
                      Converted value will appear here...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <Card className="bg-muted/50 border-none shadow-none">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Number Base Guide</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div>
              <div className="font-medium mb-1">Binary (Base 2)</div>
              <div className="text-muted-foreground">
                Uses digits 0-1. <br/>Example: 1010 = 10
              </div>
            </div>
            <div>
              <div className="font-medium mb-1">Octal (Base 8)</div>
              <div className="text-muted-foreground">
                Uses digits 0-7. <br/>Example: 12 = 10
              </div>
            </div>
            <div>
              <div className="font-medium mb-1">Decimal (Base 10)</div>
              <div className="text-muted-foreground">
                Uses digits 0-9. <br/>Standard number system.
              </div>
            </div>
            <div>
              <div className="font-medium mb-1">Hexadecimal (Base 16)</div>
              <div className="text-muted-foreground">
                Uses 0-9 and A-F. <br/>Example: A = 10
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

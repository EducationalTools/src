import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const ROMAN_VALUES: Record<string, number> = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

const ROMAN_NUMERALS = Object.keys(ROMAN_VALUES);

function toRoman(num: number): string {
  if (num <= 0 || num >= 4000) {
    return "Invalid (must be 1-3999)";
  }

  let result = "";
  for (const numeral of ROMAN_NUMERALS) {
    const value = ROMAN_VALUES[numeral];
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

function fromRoman(roman: string): number {
  const upperRoman = roman.toUpperCase().trim();
  if (!upperRoman) return 0;

  let result = 0;
  let i = 0;

  while (i < upperRoman.length) {
    // Check for two-character numerals first
    if (i < upperRoman.length - 1) {
      const twoChar = upperRoman.substring(i, i + 2);
      if (ROMAN_VALUES[twoChar]) {
        result += ROMAN_VALUES[twoChar];
        i += 2;
        continue;
      }
    }

    // Check single character
    const oneChar = upperRoman[i];
    if (ROMAN_VALUES[oneChar]) {
      result += ROMAN_VALUES[oneChar];
      i += 1;
    } else {
      return NaN; // Invalid character
    }
  }

  // Validate the result by converting back
  if (toRoman(result) !== upperRoman) {
    return NaN;
  }

  return result;
}

export default function RomanNumeral() {
  const [number, setNumber] = useState("");
  const [roman, setRoman] = useState("");
  const [direction, setDirection] = useState<"to-roman" | "from-roman">("to-roman");

  const handleNumberChange = (value: string) => {
    setNumber(value);
    if (value && !isNaN(Number(value))) {
      const num = parseInt(value, 10);
      if (num > 0 && num < 4000) {
        setRoman(toRoman(num));
      } else {
        setRoman("Invalid (must be 1-3999)");
      }
    } else {
      setRoman("");
    }
  };

  const handleRomanChange = (value: string) => {
    setRoman(value);
    const result = fromRoman(value);
    if (!isNaN(result)) {
      setNumber(result.toString());
    } else if (value === "") {
      setNumber("");
    } else {
      setNumber("Invalid");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const clear = () => {
    setNumber("");
    setRoman("");
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roman Numeral Converter</h1>
          <p className="text-muted-foreground mt-2">
            Convert between Arabic numbers and Roman numerals (1-3999)
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Arabic Number</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDirection("to-roman")}
              >
                Convert to Roman
              </Button>
            </div>
            <div className="space-y-2">
              <Input
                type="number"
                min={1}
                max={3999}
                placeholder="Enter number (1-3999)"
                value={number}
                onChange={(e) => handleNumberChange(e.target.value)}
              />
              <div className="text-sm text-muted-foreground">
                Enter a number between 1 and 3999
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Roman Numeral</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDirection("from-roman")}
              >
                Convert to Number
              </Button>
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter Roman numeral"
                value={roman}
                onChange={(e) => handleRomanChange(e.target.value)}
                className="font-mono text-lg"
              />
              <div className="text-sm text-muted-foreground">
                Enter a valid Roman numeral
              </div>
            </div>
          </Card>
        </div>

        {(number || roman) && (
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Result</div>
                <div className="text-2xl font-bold">
                  {direction === "to-roman" ? (
                    <>
                      {number} = <span className="font-mono">{roman}</span>
                    </>
                  ) : (
                    <>
                      <span className="font-mono">{roman}</span> = {number}
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(roman || number)}
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
                <Button variant="ghost" size="sm" onClick={clear}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Roman Numeral Guide</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>I = 1</div>
            <div>V = 5</div>
            <div>X = 10</div>
            <div>L = 50</div>
            <div>C = 100</div>
            <div>D = 500</div>
            <div>M = 1000</div>
            <div className="text-muted-foreground">IV = 4</div>
            <div className="text-muted-foreground">IX = 9</div>
            <div className="text-muted-foreground">XL = 40</div>
            <div className="text-muted-foreground">XC = 90</div>
            <div className="text-muted-foreground">CD = 400</div>
            <div className="text-muted-foreground">CM = 900</div>
          </div>
        </Card>
      </div>
    </div>
  );
}


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PiCopy,
  PiArrowClockwise,
  PiArrowsLeftRight,
  PiTextT,
  PiCalculator,
} from "react-icons/pi";
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
  const [direction, setDirection] = useState<"to-roman" | "from-roman">(
    "to-roman",
  );

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
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Roman Numeral Converter
        </h1>
        <p className="text-muted-foreground text-lg">
          Convert between Arabic numbers and Roman numerals (1-3999).
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiCalculator className="w-5 h-5 text-muted-foreground" />
              Arabic Number
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <div className="space-y-2">
              <Input
                type="number"
                min={1}
                max={3999}
                placeholder="Enter number (1-3999)"
                value={number}
                onChange={(e) => {
                  setDirection("to-roman");
                  handleNumberChange(e.target.value);
                }}
                className="text-lg h-12"
              />
              <div className="text-xs text-muted-foreground">
                Valid range: 1 - 3999
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={() => {
                setDirection("to-roman");
                // Focus input if needed
              }}
            >
              Active Input
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiTextT className="w-5 h-5 text-muted-foreground" />
              Roman Numeral
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter Roman numeral (e.g. MMXXIV)"
                value={roman}
                onChange={(e) => {
                  setDirection("from-roman");
                  handleRomanChange(e.target.value);
                }}
                className="font-mono text-lg h-12 uppercase"
              />
              <div className="text-xs text-muted-foreground">
                Standard numerals only (I, V, X, L, C, D, M)
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={() => {
                setDirection("from-roman");
              }}
            >
              Active Input
            </Button>
          </CardContent>
        </Card>
      </div>

      {(number || roman) && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wider font-semibold">
                  Conversion Result
                </div>
                <div className="text-3xl sm:text-4xl font-bold flex flex-wrap items-center gap-3 justify-center md:justify-start">
                  {direction === "to-roman" ? (
                    <>
                      <span className="text-muted-foreground">
                        {number || "?"}
                      </span>
                      <PiArrowsLeftRight className="w-6 h-6 text-muted-foreground opacity-50" />
                      <span className="font-mono text-primary">
                        {roman || "?"}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-mono text-muted-foreground">
                        {roman || "?"}
                      </span>
                      <PiArrowsLeftRight className="w-6 h-6 text-muted-foreground opacity-50" />
                      <span className="text-primary">{number || "?"}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="default"
                  onClick={() => copyToClipboard(roman || number)}
                  className="h-10 px-6"
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy Result
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={clear}
                  className="h-10 w-10"
                >
                  <PiArrowClockwise className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-muted/50 border-none shadow-none">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Roman Numeral Reference</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 text-center">
            <div className="bg-background rounded-lg p-3 border shadow-sm">
              <div className="font-bold text-lg font-mono">I</div>
              <div className="text-xs text-muted-foreground mt-1">1</div>
            </div>
            <div className="bg-background rounded-lg p-3 border shadow-sm">
              <div className="font-bold text-lg font-mono">V</div>
              <div className="text-xs text-muted-foreground mt-1">5</div>
            </div>
            <div className="bg-background rounded-lg p-3 border shadow-sm">
              <div className="font-bold text-lg font-mono">X</div>
              <div className="text-xs text-muted-foreground mt-1">10</div>
            </div>
            <div className="bg-background rounded-lg p-3 border shadow-sm">
              <div className="font-bold text-lg font-mono">L</div>
              <div className="text-xs text-muted-foreground mt-1">50</div>
            </div>
            <div className="bg-background rounded-lg p-3 border shadow-sm">
              <div className="font-bold text-lg font-mono">C</div>
              <div className="text-xs text-muted-foreground mt-1">100</div>
            </div>
            <div className="bg-background rounded-lg p-3 border shadow-sm">
              <div className="font-bold text-lg font-mono">D</div>
              <div className="text-xs text-muted-foreground mt-1">500</div>
            </div>
            <div className="bg-background rounded-lg p-3 border shadow-sm">
              <div className="font-bold text-lg font-mono">M</div>
              <div className="text-xs text-muted-foreground mt-1">1000</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

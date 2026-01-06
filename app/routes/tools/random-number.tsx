import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { PiCopy, PiDice, PiArrowClockwise } from "react-icons/pi";

export default function RandomNumber() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [results, setResults] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const generateNumbers = () => {
    if (min >= max) {
      alert("Minimum must be less than maximum");
      return;
    }

    const range = max - min + 1;
    if (!allowDuplicates && count > range) {
      alert(`Can't generate ${count} unique numbers in range ${min}-${max}`);
      return;
    }

    const numbers: number[] = [];

    if (allowDuplicates) {
      for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
    } else {
      const available = Array.from({ length: range }, (_, i) => min + i);
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * available.length);
        numbers.push(available[randomIndex]);
        available.splice(randomIndex, 1);
      }
    }

    setResults(numbers);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (results.length === 0) return;

    try {
      await navigator.clipboard.writeText(results.join(", "));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Random Number Generator
        </h1>
        <p className="text-muted-foreground text-lg">
          Generate random numbers within a specified range.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Range Inputs */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Minimum
              </label>
              <Input
                type="number"
                value={min}
                onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Maximum
              </label>
              <Input
                type="number"
                value={max}
                onChange={(e) => setMax(parseInt(e.target.value) || 0)}
                className="h-11"
              />
            </div>
          </div>

          {/* Count Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Quantity</label>
            <Input
              type="number"
              min="1"
              max="1000"
              value={count}
              onChange={(e) =>
                setCount(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="h-11"
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <input
                type="checkbox"
                checked={allowDuplicates}
                onChange={(e) => setAllowDuplicates(e.target.checked)}
                className="w-4 h-4 rounded border-input accent-primary cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Allow Duplicates</span>
                <span className="text-xs text-muted-foreground">
                  Numbers can be repeated
                </span>
              </div>
            </label>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateNumbers}
            className="w-full h-12 text-base font-medium"
            size="lg"
          >
            <PiDice className="w-5 h-5 mr-2" />
            Generate
          </Button>

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium leading-none">
                  Results
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {results.length} number{results.length !== 1 ? "s" : ""}
                  </span>
                  <Button
                    onClick={copyToClipboard}
                    variant={copied ? "default" : "outline"}
                    size="sm"
                    className="h-8 px-2 text-xs"
                  >
                    <PiCopy className="w-3.5 h-3.5 mr-1" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-6 min-h-[100px] flex items-center justify-center border">
                {results.length === 1 ? (
                  <div className="text-center text-7xl font-bold font-mono tracking-tighter">
                    {results[0]}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {results.map((num, index) => (
                      <div
                        key={index}
                        className="bg-background border shadow-sm rounded-md px-3 py-2 text-xl font-mono font-semibold"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Random Number Generator
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate random numbers within a specified range
          </p>
        </div>

        <div className="bg-card border rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            {/* Range Inputs */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum</label>
                <Input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Maximum</label>
                <Input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(parseInt(e.target.value) || 0)}
                  className="h-12"
                />
              </div>
            </div>

            {/* Count Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                How many numbers to generate?
              </label>
              <Input
                type="number"
                min="1"
                max="1000"
                value={count}
                onChange={(e) =>
                  setCount(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="h-12"
              />
            </div>

            {/* Options */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowDuplicates}
                  onChange={(e) => setAllowDuplicates(e.target.checked)}
                  className="w-4 h-4 rounded border-input accent-primary cursor-pointer"
                />
                <span className="text-sm">Allow duplicate numbers</span>
              </label>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateNumbers}
              className="w-full h-12 text-base"
              size="lg"
            >
              Generate
            </Button>

            {/* Results */}
            {results.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Results</label>
                  <Button
                    onClick={copyToClipboard}
                    variant={copied ? "default" : "outline"}
                    size="sm"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>

                <div className="bg-muted rounded-lg p-4 min-h-[100px]">
                  {results.length === 1 ? (
                    <div className="text-center text-5xl font-bold font-mono">
                      {results[0]}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {results.map((num, index) => (
                        <div
                          key={index}
                          className="bg-background border rounded-md px-3 py-2 text-lg font-mono font-semibold"
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-sm text-muted-foreground text-center">
                  Generated {results.length} number{results.length !== 1 ? "s" : ""}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

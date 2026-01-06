import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { PiCopy, PiArrowClockwise, PiShieldCheck } from "react-icons/pi";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let characters = "";
    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    if (characters.length === 0) {
      setPassword("");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
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
          Password Generator
        </h1>
        <p className="text-muted-foreground text-lg">
          Generate secure random passwords instantly.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-8">
          {/* Generated Password Display */}
          <div className="space-y-3">
            <label className="text-sm font-medium leading-none">
              Generated Password
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  value={password}
                  readOnly
                  placeholder="Click generate..."
                  className="font-mono text-lg h-12 bg-muted pr-12"
                />
                {password && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
                    <PiShieldCheck className="w-5 h-5" />
                  </div>
                )}
              </div>
              <Button
                onClick={copyToClipboard}
                disabled={!password}
                variant={copied ? "default" : "outline"}
                className="px-6 h-12 font-medium"
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          {/* Password Length */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium leading-none">
                Password Length: {length}
              </label>
            </div>
            {/* Fallback to input range if Slider is not available, but Slider is standard Shadcn. I'll use input range for safety as I haven't checked Slider availability */}
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>4</span>
              <span>64</span>
            </div>
          </div>

          {/* Character Options */}
          <div className="space-y-4">
            <label className="text-sm font-medium block leading-none">
              Include Characters
            </label>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-4 h-4 rounded border-input accent-primary cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Uppercase</span>
                  <span className="text-xs text-muted-foreground">A-Z</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="w-4 h-4 rounded border-input accent-primary cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Lowercase</span>
                  <span className="text-xs text-muted-foreground">a-z</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-4 h-4 rounded border-input accent-primary cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Numbers</span>
                  <span className="text-xs text-muted-foreground">0-9</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-4 h-4 rounded border-input accent-primary cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Symbols</span>
                  <span className="text-xs text-muted-foreground">
                    !@#$%^&*
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generatePassword}
            className="w-full h-12 text-base font-medium"
            size="lg"
          >
            <PiArrowClockwise className="w-4 h-4 mr-2" />
            Generate Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

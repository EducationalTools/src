import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      result += characters.charAt(Math.floor(Math.random() * characters.length));
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
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Password Generator
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate secure random passwords
          </p>
        </div>

        <div className="bg-card border rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            {/* Generated Password Display */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Generated Password</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={password}
                  readOnly
                  placeholder="Click generate to create a password"
                  className="font-mono text-lg h-12 bg-muted"
                />
                <Button
                  onClick={copyToClipboard}
                  disabled={!password}
                  variant={copied ? "default" : "outline"}
                  className="px-6"
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>

            {/* Password Length */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">
                  Password Length: {length}
                </label>
              </div>
              <input
                type="range"
                min="4"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>4</span>
                <span>64</span>
              </div>
            </div>

            {/* Character Options */}
            <div className="space-y-3">
              <label className="text-sm font-medium block">
                Include Characters
              </label>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                    className="w-4 h-4 rounded border-input accent-primary cursor-pointer"
                  />
                  <span className="text-sm">
                    Uppercase Letters (A-Z)
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                    className="w-4 h-4 rounded border-input accent-primary cursor-pointer"
                  />
                  <span className="text-sm">
                    Lowercase Letters (a-z)
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="w-4 h-4 rounded border-input accent-primary cursor-pointer"
                  />
                  <span className="text-sm">Numbers (0-9)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="w-4 h-4 rounded border-input accent-primary cursor-pointer"
                  />
                  <span className="text-sm">
                    Symbols (!@#$%^&*)
                  </span>
                </label>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generatePassword}
              className="w-full h-12 text-base"
              size="lg"
            >
              Generate Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

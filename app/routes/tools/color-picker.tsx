import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ColorPicker() {
  const [color, setColor] = useState("#3b82f6");
  const [savedColors, setSavedColors] = useState<string[]>([]);
  const [copied, setCopied] = useState("");

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(format);
      setTimeout(() => setCopied(""), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const saveColor = () => {
    if (!savedColors.includes(color)) {
      setSavedColors([...savedColors, color]);
    }
  };

  const removeColor = (colorToRemove: string) => {
    setSavedColors(savedColors.filter((c) => c !== colorToRemove));
  };

  const presetColors = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#d946ef",
    "#ec4899",
    "#f43f5e",
    "#000000",
    "#ffffff",
    "#6b7280",
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Color Picker</h1>
          <p className="text-muted-foreground mt-2">
            Pick colors and get values in different formats
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Color Picker Section */}
          <div className="bg-card border rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              {/* Color Display */}
              <div
                className="w-full h-48 rounded-lg border-2 border-border shadow-inner transition-colors"
                style={{ backgroundColor: color }}
              />

              {/* Color Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Pick a Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-12 w-20 rounded-md border border-input cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-12 font-mono uppercase"
                    placeholder="#000000"
                  />
                  <Button
                    onClick={saveColor}
                    variant="outline"
                    className="h-12 px-4"
                  >
                    Save
                  </Button>
                </div>
              </div>

              {/* Preset Colors */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Preset Colors</label>
                <div className="grid grid-cols-10 gap-2">
                  {presetColors.map((presetColor) => (
                    <button
                      key={presetColor}
                      onClick={() => setColor(presetColor)}
                      className="w-8 h-8 rounded-md border-2 border-border hover:scale-110 transition-transform cursor-pointer"
                      style={{ backgroundColor: presetColor }}
                      title={presetColor}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Color Values Section */}
          <div className="bg-card border rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Color Values</h3>

              {/* HEX */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  HEX
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={color.toUpperCase()}
                    readOnly
                    className="font-mono bg-muted"
                  />
                  <Button
                    onClick={() => copyToClipboard(color, "hex")}
                    variant={copied === "hex" ? "default" : "outline"}
                    size="sm"
                  >
                    {copied === "hex" ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>

              {/* RGB */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  RGB
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                    readOnly
                    className="font-mono bg-muted"
                  />
                  <Button
                    onClick={() =>
                      copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "rgb")
                    }
                    variant={copied === "rgb" ? "default" : "outline"}
                    size="sm"
                  >
                    {copied === "rgb" ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>

              {/* HSL */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  HSL
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                    readOnly
                    className="font-mono bg-muted"
                  />
                  <Button
                    onClick={() =>
                      copyToClipboard(
                        `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
                        "hsl"
                      )
                    }
                    variant={copied === "hsl" ? "default" : "outline"}
                    size="sm"
                  >
                    {copied === "hsl" ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>

              {/* RGB Components */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">R</div>
                  <div className="text-lg font-bold font-mono">{rgb.r}</div>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">G</div>
                  <div className="text-lg font-bold font-mono">{rgb.g}</div>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">B</div>
                  <div className="text-lg font-bold font-mono">{rgb.b}</div>
                </div>
              </div>

              {/* HSL Components */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">H</div>
                  <div className="text-lg font-bold font-mono">{hsl.h}°</div>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">S</div>
                  <div className="text-lg font-bold font-mono">{hsl.s}%</div>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">L</div>
                  <div className="text-lg font-bold font-mono">{hsl.l}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Colors */}
        {savedColors.length > 0 && (
          <div className="bg-card border rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Saved Colors</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSavedColors([])}
                >
                  Clear All
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {savedColors.map((savedColor, index) => (
                  <div key={index} className="relative group">
                    <button
                      onClick={() => setColor(savedColor)}
                      className="w-full h-20 rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer shadow-sm hover:shadow-md"
                      style={{ backgroundColor: savedColor }}
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-background/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-mono text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {savedColor}
                    </div>
                    <button
                      onClick={() => removeColor(savedColor)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold hover:scale-110"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

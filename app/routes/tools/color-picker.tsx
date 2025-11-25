import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Copy, Plus, X, Trash2 } from "lucide-react";

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
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Color Picker</h1>
        <p className="text-muted-foreground text-lg">
          Pick colors and convert between HEX, RGB, and HSL formats.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Color Picker Section */}
        <Card>
          <CardHeader>
            <CardTitle>Picker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Color Display */}
            <div
              className="w-full h-48 rounded-lg border-2 border-border shadow-sm transition-colors"
              style={{ backgroundColor: color }}
            />

            {/* Color Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium leading-none">Pick a Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-11 w-14 rounded-md border border-input bg-transparent cursor-pointer p-1"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-11 font-mono uppercase"
                  placeholder="#000000"
                />
                <Button
                  onClick={saveColor}
                  variant="outline"
                  className="h-11 px-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            {/* Preset Colors */}
            <div className="space-y-3">
              <label className="text-sm font-medium leading-none">Preset Colors</label>
              <div className="grid grid-cols-10 gap-2">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    onClick={() => setColor(presetColor)}
                    className="aspect-square rounded-md border border-border hover:scale-110 transition-transform cursor-pointer ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    style={{ backgroundColor: presetColor }}
                    title={presetColor}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Values Section */}
        <Card>
           <CardHeader>
            <CardTitle>Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
                  className="font-mono bg-muted h-11"
                />
                <Button
                  onClick={() => copyToClipboard(color, "hex")}
                  variant={copied === "hex" ? "default" : "outline"}
                  size="icon"
                  className="h-11 w-11 shrink-0"
                >
                  <Copy className="w-4 h-4" />
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
                  className="font-mono bg-muted h-11"
                />
                <Button
                  onClick={() =>
                    copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "rgb")
                  }
                  variant={copied === "rgb" ? "default" : "outline"}
                  size="icon"
                  className="h-11 w-11 shrink-0"
                >
                   <Copy className="w-4 h-4" />
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
                  className="font-mono bg-muted h-11"
                />
                <Button
                  onClick={() =>
                    copyToClipboard(
                      `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
                      "hsl"
                    )
                  }
                  variant={copied === "hsl" ? "default" : "outline"}
                  size="icon"
                  className="h-11 w-11 shrink-0"
                >
                   <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
                 {/* RGB Components */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground block text-center">RGB Components</label>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-muted rounded-lg p-2 text-center border">
                        <div className="text-[10px] text-muted-foreground mb-1">R</div>
                        <div className="text-sm font-bold font-mono">{rgb.r}</div>
                        </div>
                        <div className="bg-muted rounded-lg p-2 text-center border">
                        <div className="text-[10px] text-muted-foreground mb-1">G</div>
                        <div className="text-sm font-bold font-mono">{rgb.g}</div>
                        </div>
                        <div className="bg-muted rounded-lg p-2 text-center border">
                        <div className="text-[10px] text-muted-foreground mb-1">B</div>
                        <div className="text-sm font-bold font-mono">{rgb.b}</div>
                        </div>
                    </div>
                </div>

                 {/* HSL Components */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground block text-center">HSL Components</label>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-muted rounded-lg p-2 text-center border">
                        <div className="text-[10px] text-muted-foreground mb-1">H</div>
                        <div className="text-sm font-bold font-mono">{hsl.h}°</div>
                        </div>
                        <div className="bg-muted rounded-lg p-2 text-center border">
                        <div className="text-[10px] text-muted-foreground mb-1">S</div>
                        <div className="text-sm font-bold font-mono">{hsl.s}%</div>
                        </div>
                        <div className="bg-muted rounded-lg p-2 text-center border">
                        <div className="text-[10px] text-muted-foreground mb-1">L</div>
                        <div className="text-sm font-bold font-mono">{hsl.l}%</div>
                        </div>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Colors */}
      {savedColors.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Saved Colors</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSavedColors([])}
              className="h-8"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {savedColors.map((savedColor, index) => (
                <div key={index} className="relative group">
                  <button
                    onClick={() => setColor(savedColor)}
                    className="w-full h-20 rounded-lg border border-border hover:border-primary transition-all cursor-pointer shadow-sm hover:shadow-md"
                    style={{ backgroundColor: savedColor }}
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-background/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-mono text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {savedColor}
                  </div>
                  <button
                    onClick={() => removeColor(savedColor)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:scale-110 shadow-sm"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

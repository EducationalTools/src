import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type UnitCategory = "length" | "weight" | "temperature" | "volume";

interface Unit {
  name: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

const units: Record<UnitCategory, Record<string, Unit>> = {
  length: {
    meters: {
      name: "Meters",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    kilometers: {
      name: "Kilometers",
      toBase: (v) => v * 1000,
      fromBase: (v) => v / 1000,
    },
    centimeters: {
      name: "Centimeters",
      toBase: (v) => v / 100,
      fromBase: (v) => v * 100,
    },
    miles: {
      name: "Miles",
      toBase: (v) => v * 1609.34,
      fromBase: (v) => v / 1609.34,
    },
    yards: {
      name: "Yards",
      toBase: (v) => v * 0.9144,
      fromBase: (v) => v / 0.9144,
    },
    feet: {
      name: "Feet",
      toBase: (v) => v * 0.3048,
      fromBase: (v) => v / 0.3048,
    },
    inches: {
      name: "Inches",
      toBase: (v) => v * 0.0254,
      fromBase: (v) => v / 0.0254,
    },
  },
  weight: {
    kilograms: {
      name: "Kilograms",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    grams: {
      name: "Grams",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000,
    },
    milligrams: {
      name: "Milligrams",
      toBase: (v) => v / 1000000,
      fromBase: (v) => v * 1000000,
    },
    pounds: {
      name: "Pounds",
      toBase: (v) => v * 0.453592,
      fromBase: (v) => v / 0.453592,
    },
    ounces: {
      name: "Ounces",
      toBase: (v) => v * 0.0283495,
      fromBase: (v) => v / 0.0283495,
    },
    tons: {
      name: "Metric Tons",
      toBase: (v) => v * 1000,
      fromBase: (v) => v / 1000,
    },
  },
  temperature: {
    celsius: {
      name: "Celsius",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    fahrenheit: {
      name: "Fahrenheit",
      toBase: (v) => ((v - 32) * 5) / 9,
      fromBase: (v) => (v * 9) / 5 + 32,
    },
    kelvin: {
      name: "Kelvin",
      toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15,
    },
  },
  volume: {
    liters: {
      name: "Liters",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    milliliters: {
      name: "Milliliters",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000,
    },
    gallons: {
      name: "Gallons (US)",
      toBase: (v) => v * 3.78541,
      fromBase: (v) => v / 3.78541,
    },
    quarts: {
      name: "Quarts (US)",
      toBase: (v) => v * 0.946353,
      fromBase: (v) => v / 0.946353,
    },
    cups: {
      name: "Cups (US)",
      toBase: (v) => v * 0.236588,
      fromBase: (v) => v / 0.236588,
    },
    tablespoons: {
      name: "Tablespoons",
      toBase: (v) => v * 0.0147868,
      fromBase: (v) => v / 0.0147868,
    },
  },
};

export default function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const convert = (value: string, from: string, to: string) => {
    if (!value || isNaN(parseFloat(value))) {
      setToValue("");
      return;
    }

    const numValue = parseFloat(value);
    const baseValue = units[category][from].toBase(numValue);
    const result = units[category][to].fromBase(baseValue);
    setToValue(result.toFixed(6).replace(/\.?0+$/, ""));
  };

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
    convert(value, fromUnit, toUnit);
  };

  const handleCategoryChange = (newCategory: UnitCategory) => {
    setCategory(newCategory);
    const firstUnit = Object.keys(units[newCategory])[0];
    const secondUnit = Object.keys(units[newCategory])[1] || firstUnit;
    setFromUnit(firstUnit);
    setToUnit(secondUnit);
    setFromValue("");
    setToValue("");
  };

  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit);
    if (fromValue) {
      convert(fromValue, unit, toUnit);
    }
  };

  const handleToUnitChange = (unit: string) => {
    setToUnit(unit);
    if (fromValue) {
      convert(fromValue, fromUnit, unit);
    }
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Unit Converter</h1>
          <p className="text-muted-foreground mt-2">
            Convert between different units of measurement
          </p>
        </div>

        <div className="bg-card border rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="text-sm font-medium mb-3 block">
                Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(["length", "weight", "temperature", "volume"] as UnitCategory[]).map(
                  (cat) => (
                    <Button
                      key={cat}
                      variant={category === cat ? "default" : "outline"}
                      onClick={() => handleCategoryChange(cat)}
                      className="capitalize"
                    >
                      {cat}
                    </Button>
                  )
                )}
              </div>
            </div>

            {/* From Unit */}
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  type="number"
                  placeholder="Enter value"
                  value={fromValue}
                  onChange={(e) => handleFromValueChange(e.target.value)}
                  className="text-lg h-12"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => handleFromUnitChange(e.target.value)}
                  className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {Object.entries(units[category]).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapUnits}
                className="rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 10L2 15l5 5" />
                  <path d="M2 15h20" />
                  <path d="M17 14l5-5-5-5" />
                  <path d="M22 9H2" />
                </svg>
              </Button>
            </div>

            {/* To Unit */}
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  type="number"
                  placeholder="Result"
                  value={toValue}
                  readOnly
                  className="text-lg h-12 bg-muted"
                />
                <select
                  value={toUnit}
                  onChange={(e) => handleToUnitChange(e.target.value)}
                  className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {Object.entries(units[category]).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

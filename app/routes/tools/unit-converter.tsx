import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { PiArrowsLeftRight } from "react-icons/pi";

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
    <div className="container mx-auto p-6 max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Unit Converter
        </h1>
        <p className="text-muted-foreground text-lg">
          Convert between different units of measurement.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-8">
          {/* Category Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium leading-none">Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                ["length", "weight", "temperature", "volume"] as UnitCategory[]
              ).map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  onClick={() => handleCategoryChange(cat)}
                  className="capitalize w-full"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-[1fr_auto_1fr] items-start">
            {/* From Unit */}
            <div className="space-y-3">
              <label className="text-sm font-medium leading-none">From</label>
              <div className="space-y-2">
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
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            <div className="flex justify-center pt-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={swapUnits}
                className="rounded-full h-10 w-10 hover:bg-muted"
              >
                <PiArrowsLeftRight className="w-5 h-5" />
              </Button>
            </div>

            {/* To Unit */}
            <div className="space-y-3">
              <label className="text-sm font-medium leading-none">To</label>
              <div className="space-y-2">
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
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
        </CardContent>
      </Card>
    </div>
  );
}

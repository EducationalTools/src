import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Formula {
  category: string;
  name: string;
  formula: string;
  description: string;
}

const FORMULAS: Formula[] = [
  {
    category: "Algebra",
    name: "Quadratic Formula",
    formula: "x = (-b ± √(b² - 4ac)) / 2a",
    description: "Solutions to ax² + bx + c = 0",
  },
  {
    category: "Algebra",
    name: "Distance Formula",
    formula: "d = √((x₂ - x₁)² + (y₂ - y₁)²)",
    description: "Distance between two points in a plane",
  },
  {
    category: "Algebra",
    name: "Slope Formula",
    formula: "m = (y₂ - y₁) / (x₂ - x₁)",
    description: "Slope of a line through two points",
  },
  {
    category: "Geometry",
    name: "Area of Circle",
    formula: "A = πr²",
    description: "Area of a circle with radius r",
  },
  {
    category: "Geometry",
    name: "Circumference of Circle",
    formula: "C = 2πr",
    description: "Circumference of a circle with radius r",
  },
  {
    category: "Geometry",
    name: "Area of Rectangle",
    formula: "A = l × w",
    description: "Area of a rectangle with length l and width w",
  },
  {
    category: "Geometry",
    name: "Area of Triangle",
    formula: "A = (1/2) × b × h",
    description: "Area of a triangle with base b and height h",
  },
  {
    category: "Geometry",
    name: "Pythagorean Theorem",
    formula: "a² + b² = c²",
    description: "For a right triangle with legs a, b and hypotenuse c",
  },
  {
    category: "Trigonometry",
    name: "Sine",
    formula: "sin(θ) = opposite / hypotenuse",
    description: "Sine of angle θ in a right triangle",
  },
  {
    category: "Trigonometry",
    name: "Cosine",
    formula: "cos(θ) = adjacent / hypotenuse",
    description: "Cosine of angle θ in a right triangle",
  },
  {
    category: "Trigonometry",
    name: "Tangent",
    formula: "tan(θ) = opposite / adjacent",
    description: "Tangent of angle θ in a right triangle",
  },
  {
    category: "Calculus",
    name: "Derivative of xⁿ",
    formula: "d/dx(xⁿ) = nxⁿ⁻¹",
    description: "Power rule for derivatives",
  },
  {
    category: "Calculus",
    name: "Integral of xⁿ",
    formula: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C",
    description: "Power rule for integrals (n ≠ -1)",
  },
  {
    category: "Statistics",
    name: "Mean",
    formula: "μ = (Σx) / n",
    description: "Average of a set of numbers",
  },
  {
    category: "Statistics",
    name: "Standard Deviation",
    formula: "σ = √(Σ(x - μ)² / n)",
    description: "Measure of data spread",
  },
  {
    category: "Physics",
    name: "Kinetic Energy",
    formula: "KE = (1/2)mv²",
    description: "Energy of motion",
  },
  {
    category: "Physics",
    name: "Potential Energy",
    formula: "PE = mgh",
    description: "Gravitational potential energy",
  },
  {
    category: "Physics",
    name: "Force",
    formula: "F = ma",
    description: "Newton's second law",
  },
];

export default function MathFormulas() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(FORMULAS.map((f) => f.category)));

  const filteredFormulas = FORMULAS.filter((formula) => {
    const matchesSearch =
      formula.name.toLowerCase().includes(search.toLowerCase()) ||
      formula.formula.toLowerCase().includes(search.toLowerCase()) ||
      formula.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || formula.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Math Formula Reference</h1>
          <p className="text-muted-foreground mt-2">
            Quick reference for common mathematical formulas
          </p>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search formulas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFormulas.map((formula, index) => (
            <Card key={index} className="p-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {formula.category}
                    </div>
                    <h3 className="text-lg font-semibold">{formula.name}</h3>
                  </div>
                </div>
                <div className="bg-muted rounded-md p-4">
                  <div className="font-mono text-lg text-center">
                    {formula.formula}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formula.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {filteredFormulas.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-muted-foreground">
              No formulas found matching your search.
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}


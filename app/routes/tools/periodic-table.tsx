import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { toast } from "sonner";

interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: string;
  category: string;
  period: number;
  group: number;
}

const PERIODIC_TABLE: Element[] = [
  { symbol: "H", name: "Hydrogen", atomicNumber: 1, atomicMass: "1.008", category: "Nonmetal", period: 1, group: 1 },
  { symbol: "He", name: "Helium", atomicNumber: 2, atomicMass: "4.003", category: "Noble Gas", period: 1, group: 18 },
  { symbol: "Li", name: "Lithium", atomicNumber: 3, atomicMass: "6.941", category: "Alkali Metal", period: 2, group: 1 },
  { symbol: "Be", name: "Beryllium", atomicNumber: 4, atomicMass: "9.012", category: "Alkaline Earth Metal", period: 2, group: 2 },
  { symbol: "B", name: "Boron", atomicNumber: 5, atomicMass: "10.81", category: "Metalloid", period: 2, group: 13 },
  { symbol: "C", name: "Carbon", atomicNumber: 6, atomicMass: "12.01", category: "Nonmetal", period: 2, group: 14 },
  { symbol: "N", name: "Nitrogen", atomicNumber: 7, atomicMass: "14.01", category: "Nonmetal", period: 2, group: 15 },
  { symbol: "O", name: "Oxygen", atomicNumber: 8, atomicMass: "16.00", category: "Nonmetal", period: 2, group: 16 },
  { symbol: "F", name: "Fluorine", atomicNumber: 9, atomicMass: "19.00", category: "Halogen", period: 2, group: 17 },
  { symbol: "Ne", name: "Neon", atomicNumber: 10, atomicMass: "20.18", category: "Noble Gas", period: 2, group: 18 },
  { symbol: "Na", name: "Sodium", atomicNumber: 11, atomicMass: "22.99", category: "Alkali Metal", period: 3, group: 1 },
  { symbol: "Mg", name: "Magnesium", atomicNumber: 12, atomicMass: "24.31", category: "Alkaline Earth Metal", period: 3, group: 2 },
  { symbol: "Al", name: "Aluminum", atomicNumber: 13, atomicMass: "26.98", category: "Post-transition Metal", period: 3, group: 13 },
  { symbol: "Si", name: "Silicon", atomicNumber: 14, atomicMass: "28.09", category: "Metalloid", period: 3, group: 14 },
  { symbol: "P", name: "Phosphorus", atomicNumber: 15, atomicMass: "30.97", category: "Nonmetal", period: 3, group: 15 },
  { symbol: "S", name: "Sulfur", atomicNumber: 16, atomicMass: "32.07", category: "Nonmetal", period: 3, group: 16 },
  { symbol: "Cl", name: "Chlorine", atomicNumber: 17, atomicMass: "35.45", category: "Halogen", period: 3, group: 17 },
  { symbol: "Ar", name: "Argon", atomicNumber: 18, atomicMass: "39.95", category: "Noble Gas", period: 3, group: 18 },
  { symbol: "K", name: "Potassium", atomicNumber: 19, atomicMass: "39.10", category: "Alkali Metal", period: 4, group: 1 },
  { symbol: "Ca", name: "Calcium", atomicNumber: 20, atomicMass: "40.08", category: "Alkaline Earth Metal", period: 4, group: 2 },
  { symbol: "Fe", name: "Iron", atomicNumber: 26, atomicMass: "55.85", category: "Transition Metal", period: 4, group: 8 },
  { symbol: "Cu", name: "Copper", atomicNumber: 29, atomicMass: "63.55", category: "Transition Metal", period: 4, group: 11 },
  { symbol: "Zn", name: "Zinc", atomicNumber: 30, atomicMass: "65.38", category: "Transition Metal", period: 4, group: 12 },
  { symbol: "Ag", name: "Silver", atomicNumber: 47, atomicMass: "107.87", category: "Transition Metal", period: 5, group: 11 },
  { symbol: "Au", name: "Gold", atomicNumber: 79, atomicMass: "196.97", category: "Transition Metal", period: 6, group: 11 },
];

export default function PeriodicTable() {
  const [search, setSearch] = useState("");
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const filteredElements = PERIODIC_TABLE.filter(
    (el) =>
      el.name.toLowerCase().includes(search.toLowerCase()) ||
      el.symbol.toLowerCase().includes(search.toLowerCase()) ||
      el.atomicNumber.toString().includes(search)
  );

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Alkali Metal": "bg-red-500/20 border-red-500/50",
      "Alkaline Earth Metal": "bg-orange-500/20 border-orange-500/50",
      "Transition Metal": "bg-yellow-500/20 border-yellow-500/50",
      "Post-transition Metal": "bg-green-500/20 border-green-500/50",
      Metalloid: "bg-teal-500/20 border-teal-500/50",
      Nonmetal: "bg-blue-500/20 border-blue-500/50",
      Halogen: "bg-purple-500/20 border-purple-500/50",
      "Noble Gas": "bg-pink-500/20 border-pink-500/50",
    };
    return colors[category] || "bg-gray-500/20 border-gray-500/50";
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Periodic Table</h1>
          <p className="text-muted-foreground mt-2">
            Interactive periodic table of elements
          </p>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, symbol, or atomic number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredElements.map((element) => (
            <Card
              key={element.atomicNumber}
              className={`p-3 cursor-pointer transition-all hover:scale-105 border-2 ${getCategoryColor(
                element.category
              )}`}
              onClick={() => setSelectedElement(element)}
            >
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">
                  {element.atomicNumber}
                </div>
                <div className="text-xl font-bold mb-1">{element.symbol}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {element.name}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {element.atomicMass}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedElement && (
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedElement.name}</h2>
                  <p className="text-muted-foreground">{selectedElement.symbol}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedElement(null)}
                >
                  Close
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Atomic Number</div>
                  <div className="text-lg font-semibold">
                    {selectedElement.atomicNumber}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Atomic Mass</div>
                  <div className="text-lg font-semibold">
                    {selectedElement.atomicMass}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Category</div>
                  <div className="text-lg font-semibold">
                    {selectedElement.category}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Period</div>
                  <div className="text-lg font-semibold">
                    {selectedElement.period}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}


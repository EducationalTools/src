import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue = currentValue;

      switch (operation) {
        case "+":
          newValue = currentValue + inputValue;
          break;
        case "-":
          newValue = currentValue - inputValue;
          break;
        case "*":
          newValue = currentValue * inputValue;
          break;
        case "/":
          newValue = currentValue / inputValue;
          break;
        default:
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const currentValue = previousValue;
      let newValue = currentValue;

      switch (operation) {
        case "+":
          newValue = currentValue + inputValue;
          break;
        case "-":
          newValue = currentValue - inputValue;
          break;
        case "*":
          newValue = currentValue * inputValue;
          break;
        case "/":
          newValue = currentValue / inputValue;
          break;
        default:
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  return (
    <div className="container mx-auto p-6 max-w-md space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Calculator</h1>
        <p className="text-muted-foreground text-lg">
          A simple calculator for basic arithmetic operations.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="bg-muted rounded-lg p-6 mb-6 border">
            <div className="text-right text-5xl font-mono font-semibold tracking-tight break-all min-h-[60px] flex items-center justify-end text-foreground">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <Button
              variant="secondary"
              className="h-16 text-xl font-medium"
              onClick={clear}
            >
              AC
            </Button>
            <Button
              variant="secondary"
              className="h-16 text-xl font-medium"
              onClick={toggleSign}
            >
              +/−
            </Button>
            <Button
              variant="secondary"
              className="h-16 text-xl font-medium"
              onClick={percentage}
            >
              %
            </Button>
            <Button
              className="h-16 text-xl font-medium"
              onClick={() => performOperation("/")}
            >
              ÷
            </Button>

            {/* Row 2 */}
            <Button
              variant="outline"
              className="h-16 text-xl font-medium"
              onClick={() => inputDigit("7")}
            >
              7
            </Button>
            <Button
              variant="outline"
              className="h-16 text-xl font-medium"
              onClick={() => inputDigit("8")}
            >
              8
            </Button>
            <Button
              variant="outline"
              className="h-16 text-xl font-medium"
              onClick={() => inputDigit("9")}
            >
              9
            </Button>
            <Button
              className="h-16 text-xl font-medium"
              onClick={() => performOperation("*")}
            >
              ×
            </Button>

            {/* Row 3 */}
            <Button
              variant="outline"
              className="h-16 text-xl font-medium"
              onClick={() => inputDigit("4")}
            >
              4
            </Button>
            <Button
              variant="outline"
              className="h-16 text-xl font-medium"
              onClick={() => inputDigit("5")}
            >
              5
            </Button>
            <Button
              variant="outline"
              className="h-16 text-xl font-medium"
              onClick={() => inputDigit("6")}
            >
              6
            </Button>
            <Button
              className="h-16 text-xl font-medium"
              onClick={() => performOperation("-")}
            >
              −
            </Button>

            {/* Row 4 */}
            <Button
              variant="outline"
              className="h-16 text-xl font-medium"
              onClick={() => inputDigit("1")}
            >
              1
            </Button>
            <Button
              variant="outline"
              className="h-16 text-xl font-medium"
              onClick={() => inputDigit("2")}
            >
              2
            </Button>
            <Button
              variant="outline"
              className="h-16 text-xl font-medium"
              onClick={() => inputDigit("3")}
            >
              3
            </Button>
            <Button
              className="h-16 text-xl font-medium"
              onClick={() => performOperation("+")}
            >
              +
            </Button>

            {/* Row 5 */}
            <Button
              variant="outline"
              className="h-16 text-xl font-medium col-span-2"
              onClick={() => inputDigit("0")}
            >
              0
            </Button>
            <Button
              variant="outline"
              className="h-16 text-xl font-medium"
              onClick={inputDecimal}
            >
              .
            </Button>
            <Button className="h-16 text-xl font-medium" onClick={handleEquals}>
              =
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Mode = "stopwatch" | "timer";

export default function StopwatchTimer() {
  const [mode, setMode] = useState<Mode>("stopwatch");

  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  // Timer state
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerTime, setTimerTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  const stopwatchInterval = useRef<NodeJS.Timeout | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  // Stopwatch effects
  useEffect(() => {
    if (stopwatchRunning) {
      stopwatchInterval.current = setInterval(() => {
        setStopwatchTime((prev) => prev + 10);
      }, 10);
    } else {
      if (stopwatchInterval.current) {
        clearInterval(stopwatchInterval.current);
      }
    }

    return () => {
      if (stopwatchInterval.current) {
        clearInterval(stopwatchInterval.current);
      }
    };
  }, [stopwatchRunning]);

  // Timer effects
  useEffect(() => {
    if (timerRunning && timerTime > 0) {
      timerInterval.current = setInterval(() => {
        setTimerTime((prev) => {
          if (prev <= 10) {
            setTimerRunning(false);
            setTimerFinished(true);
            // Play sound or notification
            return 0;
          }
          return prev - 10;
        });
      }, 10);
    } else {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    }

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [timerRunning, timerTime]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      milliseconds: milliseconds.toString().padStart(2, "0"),
    };
  };

  // Stopwatch functions
  const startStopwatch = () => setStopwatchRunning(true);
  const pauseStopwatch = () => setStopwatchRunning(false);
  const resetStopwatch = () => {
    setStopwatchRunning(false);
    setStopwatchTime(0);
    setLaps([]);
  };
  const lapStopwatch = () => {
    setLaps([...laps, stopwatchTime]);
  };

  // Timer functions
  const startTimer = () => {
    if (timerTime === 0) {
      const totalMs =
        (timerHours * 3600 + timerMinutes * 60 + timerSeconds) * 1000;
      if (totalMs > 0) {
        setTimerTime(totalMs);
        setTimerRunning(true);
        setTimerFinished(false);
      }
    } else {
      setTimerRunning(true);
      setTimerFinished(false);
    }
  };
  const pauseTimer = () => setTimerRunning(false);
  const resetTimer = () => {
    setTimerRunning(false);
    setTimerTime(0);
    setTimerFinished(false);
  };

  const stopwatchDisplay = formatTime(stopwatchTime);
  const timerDisplay = formatTime(timerTime);

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Stopwatch & Timer
          </h1>
          <p className="text-muted-foreground mt-2">
            Track time with a stopwatch or set a countdown timer
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={mode === "stopwatch" ? "default" : "outline"}
            onClick={() => setMode("stopwatch")}
            size="lg"
          >
            Stopwatch
          </Button>
          <Button
            variant={mode === "timer" ? "default" : "outline"}
            onClick={() => setMode("timer")}
            size="lg"
          >
            Timer
          </Button>
        </div>

        {/* Stopwatch */}
        {mode === "stopwatch" && (
          <div className="bg-card border rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              {/* Display */}
              <div className="bg-muted/50 rounded-lg p-8">
                <div className="text-center font-mono">
                  <div className="text-6xl font-bold tracking-tight">
                    {stopwatchDisplay.minutes}:{stopwatchDisplay.seconds}
                  </div>
                  <div className="text-3xl text-muted-foreground mt-2">
                    .{stopwatchDisplay.milliseconds}
                  </div>
                  {stopwatchDisplay.hours !== "00" && (
                    <div className="text-xl text-muted-foreground mt-2">
                      {stopwatchDisplay.hours} hours
                    </div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-2 gap-3">
                {!stopwatchRunning ? (
                  <Button
                    onClick={startStopwatch}
                    size="lg"
                    className="h-14 text-lg"
                  >
                    Start
                  </Button>
                ) : (
                  <Button
                    onClick={pauseStopwatch}
                    size="lg"
                    variant="outline"
                    className="h-14 text-lg"
                  >
                    Pause
                  </Button>
                )}
                <Button
                  onClick={resetStopwatch}
                  size="lg"
                  variant="outline"
                  className="h-14 text-lg"
                >
                  Reset
                </Button>
              </div>

              {stopwatchRunning && (
                <Button
                  onClick={lapStopwatch}
                  size="lg"
                  variant="secondary"
                  className="w-full h-12"
                >
                  Lap
                </Button>
              )}

              {/* Laps */}
              {laps.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Laps</h3>
                  <div className="bg-muted rounded-lg p-4 max-h-48 overflow-y-auto space-y-2">
                    {laps
                      .slice()
                      .reverse()
                      .map((lap, index) => {
                        const lapDisplay = formatTime(lap);
                        const lapNumber = laps.length - index;
                        return (
                          <div
                            key={index}
                            className="flex justify-between items-center bg-background rounded-md px-3 py-2"
                          >
                            <span className="font-medium">Lap {lapNumber}</span>
                            <span className="font-mono">
                              {lapDisplay.minutes}:{lapDisplay.seconds}.
                              {lapDisplay.milliseconds}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Timer */}
        {mode === "timer" && (
          <div className="bg-card border rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              {/* Display */}
              <div className="bg-muted/50 rounded-lg p-8">
                <div className="text-center font-mono">
                  {timerTime > 0 ? (
                    <>
                      <div
                        className={`text-6xl font-bold tracking-tight ${
                          timerFinished ? "text-destructive" : ""
                        }`}
                      >
                        {timerDisplay.hours}:{timerDisplay.minutes}:
                        {timerDisplay.seconds}
                      </div>
                      {timerFinished && (
                        <div className="text-xl text-destructive font-semibold mt-4">
                          Time's Up!
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-6xl font-bold tracking-tight text-muted-foreground">
                      00:00:00
                    </div>
                  )}
                </div>
              </div>

              {/* Time Input */}
              {timerTime === 0 && !timerRunning && (
                <div className="space-y-3">
                  <label className="text-sm font-medium block">Set Time</label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Input
                        type="number"
                        min="0"
                        max="23"
                        value={timerHours}
                        onChange={(e) =>
                          setTimerHours(
                            Math.max(0, Math.min(23, parseInt(e.target.value) || 0))
                          )
                        }
                        className="h-12 text-center text-lg font-mono"
                        placeholder="HH"
                      />
                      <div className="text-xs text-center text-muted-foreground">
                        Hours
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        min="0"
                        max="59"
                        value={timerMinutes}
                        onChange={(e) =>
                          setTimerMinutes(
                            Math.max(0, Math.min(59, parseInt(e.target.value) || 0))
                          )
                        }
                        className="h-12 text-center text-lg font-mono"
                        placeholder="MM"
                      />
                      <div className="text-xs text-center text-muted-foreground">
                        Minutes
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        min="0"
                        max="59"
                        value={timerSeconds}
                        onChange={(e) =>
                          setTimerSeconds(
                            Math.max(0, Math.min(59, parseInt(e.target.value) || 0))
                          )
                        }
                        className="h-12 text-center text-lg font-mono"
                        placeholder="SS"
                      />
                      <div className="text-xs text-center text-muted-foreground">
                        Seconds
                      </div>
                    </div>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTimerHours(0);
                        setTimerMinutes(1);
                        setTimerSeconds(0);
                      }}
                    >
                      1m
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTimerHours(0);
                        setTimerMinutes(5);
                        setTimerSeconds(0);
                      }}
                    >
                      5m
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTimerHours(0);
                        setTimerMinutes(10);
                        setTimerSeconds(0);
                      }}
                    >
                      10m
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTimerHours(0);
                        setTimerMinutes(30);
                        setTimerSeconds(0);
                      }}
                    >
                      30m
                    </Button>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="grid grid-cols-2 gap-3">
                {!timerRunning ? (
                  <Button
                    onClick={startTimer}
                    size="lg"
                    className="h-14 text-lg"
                    disabled={
                      timerTime === 0 &&
                      timerHours === 0 &&
                      timerMinutes === 0 &&
                      timerSeconds === 0
                    }
                  >
                    Start
                  </Button>
                ) : (
                  <Button
                    onClick={pauseTimer}
                    size="lg"
                    variant="outline"
                    className="h-14 text-lg"
                  >
                    Pause
                  </Button>
                )}
                <Button
                  onClick={resetTimer}
                  size="lg"
                  variant="outline"
                  className="h-14 text-lg"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

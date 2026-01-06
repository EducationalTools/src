import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PiPlay,
  PiPause,
  PiArrowCounterClockwise,
  PiFlag,
  PiTimer,
  PiClock,
} from "react-icons/pi";

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
    <div className="container mx-auto p-6 max-w-xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Stopwatch & Timer
        </h1>
        <p className="text-muted-foreground text-lg">
          Track time accurately or set a countdown.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
        <Button
          variant={mode === "stopwatch" ? "default" : "ghost"}
          onClick={() => setMode("stopwatch")}
          size="lg"
          className="rounded-md"
        >
          <PiClock className="w-4 h-4 mr-2" />
          Stopwatch
        </Button>
        <Button
          variant={mode === "timer" ? "default" : "ghost"}
          onClick={() => setMode("timer")}
          size="lg"
          className="rounded-md"
        >
          <PiTimer className="w-4 h-4 mr-2" />
          Timer
        </Button>
      </div>

      {/* Stopwatch */}
      {mode === "stopwatch" && (
        <Card className="border shadow-sm">
          <CardContent className="p-6 space-y-6">
            {/* Display */}
            <div className="bg-muted/30 rounded-xl p-8 border flex flex-col items-center justify-center min-h-[200px]">
              <div className="text-center font-mono tabular-nums">
                <div className="text-6xl sm:text-7xl font-bold tracking-tighter text-primary">
                  {stopwatchDisplay.minutes}:{stopwatchDisplay.seconds}
                </div>
                <div className="text-3xl text-muted-foreground mt-1">
                  .{stopwatchDisplay.milliseconds}
                </div>
                {stopwatchDisplay.hours !== "00" && (
                  <div className="text-sm font-medium text-muted-foreground mt-4 bg-background border rounded-full px-3 py-1 inline-block">
                    {stopwatchDisplay.hours} hours
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-4">
              {!stopwatchRunning ? (
                <Button
                  onClick={startStopwatch}
                  size="lg"
                  className="h-14 text-lg font-medium"
                >
                  <PiPlay className="w-5 h-5 mr-2 fill-current" />
                  Start
                </Button>
              ) : (
                <Button
                  onClick={pauseStopwatch}
                  size="lg"
                  variant="secondary"
                  className="h-14 text-lg font-medium"
                >
                  <PiPause className="w-5 h-5 mr-2 fill-current" />
                  Pause
                </Button>
              )}
              <Button
                onClick={resetStopwatch}
                size="lg"
                variant="outline"
                className="h-14 text-lg font-medium"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>

            {stopwatchRunning && (
              <Button
                onClick={lapStopwatch}
                size="lg"
                variant="ghost"
                className="w-full h-12 border-dashed border-2"
              >
                <PiFlag className="w-4 h-4 mr-2" />
                Lap
              </Button>
            )}

            {/* Laps */}
            {laps.length > 0 && (
              <div className="space-y-3 pt-4 border-t">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Laps
                </h3>
                <div className="bg-muted/30 rounded-lg p-2 max-h-64 overflow-y-auto space-y-1 border">
                  {laps
                    .slice()
                    .reverse()
                    .map((lap, index) => {
                      const lapDisplay = formatTime(lap);
                      const lapNumber = laps.length - index;
                      return (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-background rounded border px-4 py-3 text-sm"
                        >
                          <span className="font-medium text-muted-foreground">
                            Lap {lapNumber}
                          </span>
                          <span className="font-mono font-semibold">
                            {lapDisplay.minutes}:{lapDisplay.seconds}.
                            {lapDisplay.milliseconds}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Timer */}
      {mode === "timer" && (
        <Card className="border shadow-sm">
          <CardContent className="p-6 space-y-6">
            {/* Display */}
            <div className="bg-muted/30 rounded-xl p-8 border flex flex-col items-center justify-center min-h-[200px]">
              <div className="text-center font-mono tabular-nums">
                {timerTime > 0 ? (
                  <>
                    <div
                      className={`text-6xl sm:text-7xl font-bold tracking-tighter ${
                        timerFinished
                          ? "text-destructive animate-pulse"
                          : "text-primary"
                      }`}
                    >
                      {timerDisplay.hours}:{timerDisplay.minutes}:
                      {timerDisplay.seconds}
                    </div>
                    {timerFinished && (
                      <div className="text-lg text-destructive font-semibold mt-4 flex items-center justify-center gap-2">
                        <span>Time's Up!</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-6xl sm:text-7xl font-bold tracking-tighter text-muted-foreground/30">
                    00:00:00
                  </div>
                )}
              </div>
            </div>

            {/* Time Input */}
            {timerTime === 0 && !timerRunning && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2 text-center">
                    <Input
                      type="number"
                      min="0"
                      max="23"
                      value={timerHours}
                      onChange={(e) =>
                        setTimerHours(
                          Math.max(
                            0,
                            Math.min(23, parseInt(e.target.value) || 0)
                          )
                        )
                      }
                      className="h-16 text-center text-2xl font-mono"
                      placeholder="00"
                    />
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Hrs
                    </div>
                  </div>
                  <div className="space-y-2 text-center">
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={timerMinutes}
                      onChange={(e) =>
                        setTimerMinutes(
                          Math.max(
                            0,
                            Math.min(59, parseInt(e.target.value) || 0)
                          )
                        )
                      }
                      className="h-16 text-center text-2xl font-mono"
                      placeholder="00"
                    />
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Mins
                    </div>
                  </div>
                  <div className="space-y-2 text-center">
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={timerSeconds}
                      onChange={(e) =>
                        setTimerSeconds(
                          Math.max(
                            0,
                            Math.min(59, parseInt(e.target.value) || 0)
                          )
                        )
                      }
                      className="h-16 text-center text-2xl font-mono"
                      placeholder="00"
                    />
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Secs
                    </div>
                  </div>
                </div>

                {/* Quick Preset Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {[1, 5, 10, 30].map((m) => (
                    <Button
                      key={m}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTimerHours(0);
                        setTimerMinutes(m);
                        setTimerSeconds(0);
                      }}
                      className="text-xs"
                    >
                      {m}m
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="grid grid-cols-2 gap-4">
              {!timerRunning ? (
                <Button
                  onClick={startTimer}
                  size="lg"
                  className="h-14 text-lg font-medium"
                  disabled={
                    timerTime === 0 &&
                    timerHours === 0 &&
                    timerMinutes === 0 &&
                    timerSeconds === 0
                  }
                >
                  <PiPlay className="w-5 h-5 mr-2 fill-current" />
                  Start
                </Button>
              ) : (
                <Button
                  onClick={pauseTimer}
                  size="lg"
                  variant="secondary"
                  className="h-14 text-lg font-medium"
                >
                  <PiPause className="w-5 h-5 mr-2 fill-current" />
                  Pause
                </Button>
              )}
              <Button
                onClick={resetTimer}
                size="lg"
                variant="outline"
                className="h-14 text-lg font-medium"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

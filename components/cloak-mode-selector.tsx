"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSettingsState } from "@/lib/state";

const cloakModeOptions = [
  { value: "off", label: "Off" },
  { value: "when-not-focused", label: "When Not Focused" },
  { value: "on", label: "On" },
] as const;

export function CloakModeSelector({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const cloak = useSettingsState((state) => state.cloak);
  const setCloak = useSettingsState((state) => state.setCloak);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {cloak.mode
            ? cloakModeOptions.find((m) => m.value === cloak.mode)?.label
            : "Select mode..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search mode..." className="h-9" />
          <CommandList>
            <CommandEmpty>No mode found.</CommandEmpty>
            <CommandGroup>
              {cloakModeOptions.map((modeOption) => (
                <CommandItem
                  key={modeOption.value}
                  value={modeOption.value}
                  onSelect={(currentValue) => {
                    setCloak({
                      mode: currentValue as "off" | "when-not-focused" | "on",
                    });
                    setOpen(false);
                  }}
                >
                  {modeOption.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      cloak.mode === modeOption.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}


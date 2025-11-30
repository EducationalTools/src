"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettingsState } from "@/lib/state";

const cloakModeOptions = [
  { value: "off", label: "Off" },
  { value: "when-not-focused", label: "When Not Focused" },
  { value: "on", label: "On" },
] as const;

export function CloakModeSelector({ className }: { className?: string }) {
  const cloak = useSettingsState((state) => state.cloak);
  const setCloak = useSettingsState((state) => state.setCloak);

  const currentLabel =
    cloakModeOptions.find((m) => m.value === cloak.mode)?.label || "Select mode...";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[200px] justify-between", className)}
        >
          {currentLabel}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        <DropdownMenuRadioGroup
          value={cloak.mode}
          onValueChange={(value) =>
            setCloak({
              mode: value as "off" | "when-not-focused" | "on",
            })
          }
        >
          {cloakModeOptions.map((modeOption) => (
            <DropdownMenuRadioItem key={modeOption.value} value={modeOption.value}>
              {modeOption.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


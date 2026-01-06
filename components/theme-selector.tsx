"use client";

import * as React from "react";
import { PiCheck, PiCaretUpDown } from "react-icons/pi";

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
import { themes } from "@/lib/themes/themes";
import { useSettingsState } from "@/lib/state";

const themeOptions = Object.entries(themes).map(([value, theme]) => ({
  value,
  label: theme.name,
}));

export function ThemeSelector({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const theme = useSettingsState((state) => state.theme);
  const setTheme = useSettingsState((state) => state.setTheme);

  return (
    <Command>
      <CommandInput placeholder="Search theme..." className="h-9" />
      <CommandList>
        <CommandEmpty>No theme found.</CommandEmpty>
        <CommandGroup>
          {themeOptions.map((themeOption) => (
            <CommandItem
              key={themeOption.value}
              value={themeOption.value}
              onSelect={(currentValue) => {
                setTheme({ theme: currentValue });
                setOpen(false);
              }}
            >
              {themeOption.label}
              <PiCheck
                className={cn(
                  "ml-auto",
                  theme.theme === themeOption.value
                    ? "opacity-100"
                    : "opacity-0"
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

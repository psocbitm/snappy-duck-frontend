"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../redux/slices/codeSlice";

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
import { languages } from "../../lib/languages";

export const SwitchLanguage = () => {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.code);
  const [open, setOpen] = React.useState(false);

  const selectedLabel =
    languages.find((lang) => lang.value === language)?.label ??
    "Select language";

  const handleSelect = (selected) => {
    if (selected !== language) {
      dispatch(setLanguage(selected));
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-transparent text-white border-gray-400"
        >
          {selectedLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((lang) => (
                <CommandItem
                  key={lang.value}
                  value={lang.value}
                  onSelect={(val) => handleSelect(val)}
                >
                  {lang.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      language === lang.value ? "opacity-100" : "opacity-0"
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
};

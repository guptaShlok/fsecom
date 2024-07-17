"use client";
import { useStoreModal } from "@/hooks/use-store-model";
import { StoreModelType as StoreType } from "@/models/Storemodel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
type PopOverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitchProps extends PopOverTriggerProps {
  items: StoreType[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitchProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item?._id.toString(),
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);
  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/dashboard/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a Store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label || "Select a Store"}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Store" />
            <CommandEmpty>No Store Found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem key={store.value}>
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      onStoreSelect(store);
                      console.log("Selected store:", store);
                    }}
                    className="text-sm w-full h-auto flex justify-start text-black"
                  >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {store.label}
                    <Check
                      className={`ml-auto h-4 w-4 ${
                        currentStore?.value === store.value
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </Button>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList className=" z-10">
            <CommandGroup>
              <CommandItem>
                <Button
                  variant={"ghost"}
                  className=" w-full"
                  onClick={() => {
                    storeModal.onOpen();
                    setOpen(false);
                    console.log("Clicked on Create Store");
                  }}
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create Store
                </Button>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;

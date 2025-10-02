import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus as CirclePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { dev_icons } from "@/resources/dev_icons";
import { useSections } from "@/components/hooks/SectionsProvider";

import type { StackSection, Tech } from "@/lib/types";

type DeviconItem = {
  name: string;
  versions: {
    svg: string[];
  };
};

export default function AddTech() {
  const { setSections, selectedSectionID } = useSections();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = dev_icons.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddTech = (item: DeviconItem) => {
    const newTech: Tech = {
      name: item.name,
      selected: item.versions.svg[0], // the chosen version (first one by default)
      versions: item.versions.svg,
    };

    setSections((prev) =>
      prev.map((section) => {
        if (section.id === selectedSectionID && section.type === "stack") {
          const stackSection = section as StackSection;

          // avoid duplicates by name
          if (!stackSection.list.some((t) => t.name === item.name)) {
            return {
              ...stackSection,
              list: [...stackSection.list, newTech],
            };
          }
        }
        return section;
      })
    );

    setIsModalOpen(false);
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        setIsModalOpen(open);
        if (open) {
          setSearch("");
        }
      }}
    >
      <Button asChild size="lg">
        <DialogTrigger>
          <CirclePlusIcon />
          Add Technology
        </DialogTrigger>
      </Button>
      <DialogContent className="!max-w-4xl !max-h-4/6 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a technology to your stack</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="p-2">
          <Input
            type="text"
            placeholder="Search technologies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-6 gap-4 p-4">
          {filtered.map((item) => {
            const version = item.versions.svg[0];
            const src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item.name}/${item.name}-${version}.svg`;

            return (
              <div
                key={item.name}
                className="flex flex-col items-center border rounded-sm p-4 hover:bg-muted hover:cursor-pointer"
                onClick={() => handleAddTech(item)}
              >
                <img
                  key={item.name}
                  src={src}
                  alt={item.name}
                  width={40}
                  height={40}
                />
                <span className="mt-2 text-center text-sm truncate w-full">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

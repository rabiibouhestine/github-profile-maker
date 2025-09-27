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
import { useState, useEffect } from "react";

import type { Section, StackSection, Tech } from "@/lib/types";

type DeviconItem = {
  name: string;
  versions: {
    svg: string[];
  };
};

type AddTechProps = {
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  selectedSectionID: number;
};

export default function AddTech({
  setSections,
  selectedSectionID,
}: AddTechProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<DeviconItem[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [search, setSearch] = useState("");

  const url =
    "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/devicon.json";

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((json: DeviconItem[]) => setData(json))
      .catch((err: unknown) => {
        if (err instanceof Error) setError(err);
        else setError(new Error("Unknown error"));
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>Loading…</div>;
  }

  const filtered = data.filter((item) =>
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
          <DialogDescription>
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

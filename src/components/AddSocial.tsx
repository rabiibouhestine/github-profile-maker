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
import { social_icons } from "@/resources/social_icons";
import { useSections } from "@/components/hooks/SectionsProvider";
import { useState } from "react";

import type { SocialsSection, Social } from "@/lib/types";

export default function AddSocial() {
  const { setSections, selectedSectionID } = useSections();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = social_icons.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSocial = (item: string) => {
    const newTech: Social = {
      name: item,
      link: "",
    };

    setSections((prev) =>
      prev.map((section) => {
        if (section.id === selectedSectionID && section.type === "socials") {
          const socialsSection = section as SocialsSection;

          // avoid duplicates by name
          if (!socialsSection.list.some((t) => t.name === item)) {
            return {
              ...socialsSection,
              list: [...socialsSection.list, newTech],
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
          Add a social link
        </DialogTrigger>
      </Button>
      <DialogContent className="!max-w-4xl !max-h-4/6 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a social link to your socials</DialogTitle>
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
            const src = `https://raw.githubusercontent.com/rabiibouhestine/github-profile-maker/refs/heads/main/src/assets/social/${item}/default.svg`;
            return (
              <div
                key={item}
                className="flex flex-col items-center border rounded-sm p-4 hover:bg-muted hover:cursor-pointer"
                onClick={() => handleAddSocial(item)}
              >
                <img key={item} src={src} alt={item} width={40} height={40} />
                <span className="mt-2 text-center text-sm truncate w-full">
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

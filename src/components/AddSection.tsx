import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Type as TextIcon,
  Image as ImageIcon,
  CirclePlus as CirclePlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Section } from "@/lib/types";

type AddSectionProps = {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  setSelectedSectionID: React.Dispatch<React.SetStateAction<number>>;
};

export default function AddSection({
  sections,
  setSections,
  setSelectedSectionID,
}: AddSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSection = (section: Section) => {
    setSections([...sections, section]);
    setSelectedSectionID(section.id);
    setIsModalOpen(false);
  };

  const options = [
    {
      label: "Text",
      icon: TextIcon,
      create: (): Section => ({
        id: Date.now(),
        type: "text",
        tag: "h1",
        align: "left",
        text: "Hello World",
      }),
    },
    {
      label: "Image",
      icon: ImageIcon,
      create: (): Section => ({
        id: Date.now(),
        type: "image",
        url: "https://via.placeholder.com/200",
        align: "center",
        height: 200,
      }),
    },
  ];

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Button asChild size="lg">
        <DialogTrigger>
          <CirclePlusIcon />
          Add Section
        </DialogTrigger>
      </Button>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add a section to your profile</DialogTitle>
          <DialogDescription>
            <div className="p-4 grid grid-cols-4 gap-4">
              {options.map(({ label, icon: Icon, create }) => (
                <button
                  key={label}
                  className="border aspect-square rounded-md flex flex-col items-center justify-center gap-3 hover:bg-muted hover:cursor-pointer"
                  onClick={() => handleAddSection(create())}
                >
                  <Icon />
                  {label}
                </button>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

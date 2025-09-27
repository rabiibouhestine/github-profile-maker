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
  Trophy as TrophyIcon,
  CirclePlus as CirclePlusIcon,
  ChartLine as ChartLineIcon,
  Flame as FlameIcon,
  CodeXml as CodeIcon,
  ChartPie as ChartPieIcon,
  Blocks as BlocksIcon,
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
      label: "Trophies",
      icon: TrophyIcon,
      create: (): Section => ({
        id: Date.now(),
        type: "trophies",
        align: "center",
        username: "rabiibouhestine",
      }),
    },
    {
      label: "Activity",
      icon: ChartLineIcon,
      create: (): Section => ({
        id: Date.now(),
        type: "activity",
        align: "center",
        username: "rabiibouhestine",
      }),
    },
    {
      label: "Streak",
      icon: FlameIcon,
      create: (): Section => ({
        id: Date.now(),
        type: "streak",
        align: "center",
        username: "rabiibouhestine",
      }),
    },
    {
      label: "Languages",
      icon: CodeIcon,
      create: (): Section => ({
        id: Date.now(),
        type: "languages",
        align: "center",
        username: "rabiibouhestine",
      }),
    },
    {
      label: "Stats",
      icon: ChartPieIcon,
      create: (): Section => ({
        id: Date.now(),
        type: "stats",
        align: "center",
        username: "rabiibouhestine",
      }),
    },
    {
      label: "Stack",
      icon: BlocksIcon,
      create: (): Section => ({
        id: Date.now(),
        type: "stack",
        align: "center",
        size: 40,
        list: [
          {
            name: "linuxmint",
            selected: "original",
            versions: [
              "original",
              "original-wordmark",
              "plain",
              "plain-wordmark",
            ],
          },
          {
            name: "liquibase",
            selected: "original",
            versions: ["original", "original-wordmark"],
          },
        ],
      }),
    },
    {
      label: "Image",
      icon: ImageIcon,
      create: (): Section => ({
        id: Date.now(),
        type: "image",
        url: "https://placehold.co/600x200",
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
      <DialogContent className="!max-w-4xl !max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a section to your profile</DialogTitle>
          <DialogDescription>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-5 gap-4 text-primary">
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

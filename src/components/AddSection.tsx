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
  MessageSquare as SocialsIcon,
  RectangleHorizontal as BadgeIcon,
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
        url: "https://placehold.co/600x200",
        align: "center",
        height: 200,
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
      label: "Socials",
      icon: SocialsIcon,
      create: (): Section => ({
        id: Date.now(),
        type: "socials",
        align: "center",
        size: 40,
        list: [
          {
            name: "facebook",
            link: "",
          },
          {
            name: "linkedin",
            link: "",
          },
        ],
      }),
    },
    {
      label: "Badges",
      icon: BadgeIcon,
      create: (): Section => ({
        id: Date.now(),
        type: "badges",
        align: "center",
        list: [
          {
            id: Date.now(),
            label: "anything",
            message: "you like",
            color: "blue",
          },
        ],
      }),
    },
    {
      label: "Trophies",
      icon: TrophyIcon,
      create: (): Section => ({
        id: Date.now(),
        type: "trophies",
        username: "rabiibouhestine",
        align: "center",
        theme: "dracula",
        title: [
          "Commits",
          "Reviews",
          "Experience",
          "Issues",
          "PullRequest",
          "Stars",
          "Repositories",
          "Followers",
        ],
        rank: ["SECRET", "SSS", "SS", "S", "AAA", "AA", "A", "B", "C"],
        column: 8,
        row: 1,
        marginW: 8,
        marginH: 8,
        bg: true,
        frame: true,
      }),
    },
    {
      label: "Activity",
      icon: ChartLineIcon,
      create: (): Section => ({
        id: Date.now(),
        type: "activity",
        username: "rabiibouhestine",
        align: "center",
        custom_title: "",
        theme: "dracula",
        radius: 16,
        height: 400,
        days: 30,
        area: true,
        hide_border: false,
        hide_title: false,
        grid: true,
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
        theme: "dracula",
        hide_border: false,
        border_radius: 4.5,
        short_numbers: true,
        mode: "daily",
        exclude_days: [],
        disable_animations: false,
        card_width: 495,
        card_height: 195,
        hide_total_contributions: false,
        hide_current_streak: false,
        hide_longest_streak: false,
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
        theme: "dracula",
        custom_title: "Most Used Languages",
        layout: "normal",
        stats_format: "percentages",
        langs_count: 5,
        card_width: 300,
        border_radius: 4.5,
        hide_title: false,
        hide_progress: false,
        hide_border: false,
        disable_animations: false,
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

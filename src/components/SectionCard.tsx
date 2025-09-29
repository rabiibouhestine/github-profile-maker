import {
  Grip as GripIcon,
  Type as TextIcon,
  Image as ImageIcon,
  SquareDashed as SquareDashedIcon,
  Trophy as TrophyIcon,
  ChartLine as ChartLineIcon,
  Flame as FlameIcon,
  CodeXml as CodeIcon,
  ChartPie as ChartPieIcon,
  Blocks as BlocksIcon,
  MessageSquare as SocialsIcon,
  RectangleHorizontal as BadgeIcon,
  SquarePen as SquarePenIcon,
  Trash as TrashIcon,
} from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Section } from "@/lib/types";

type SectionCardProps = {
  id: number;
  section: Section;
  isSelected: boolean;
  onClick: () => void;
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  setSelectedSectionID: React.Dispatch<React.SetStateAction<number>>;
};

export default function SectionCard({
  id,
  section,
  isSelected,
  onClick,
  setSections,
  setSelectedSectionID,
}: SectionCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function getIcon(type?: string) {
    switch (type) {
      case "text":
        return <TextIcon />;
      case "trophies":
        return <TrophyIcon />;
      case "activity":
        return <ChartLineIcon />;
      case "streak":
        return <FlameIcon />;
      case "languages":
        return <CodeIcon />;
      case "stats":
        return <ChartPieIcon />;
      case "stack":
        return <BlocksIcon />;
      case "socials":
        return <SocialsIcon />;
      case "badges":
        return <BadgeIcon />;
      case "image":
        return <ImageIcon />;
      default:
        return <SquareDashedIcon />;
    }
  }

  function handleDeleteSection() {
    setSections((prev) => {
      const newSections = prev.filter((s) => s.id !== id);

      // Update selectedSectionID to the last section if exists, otherwise 0
      if (newSections.length > 0) {
        setSelectedSectionID(newSections[newSections.length - 1].id);
      } else {
        setSelectedSectionID(0);
      }

      return newSections;
    });
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={
        (isSelected ? "bg-muted " : "") +
        "border rounded-sm p-2 flex items-center gap-4 min-h-16"
      }
    >
      <GripIcon
        {...attributes}
        {...listeners}
        className="text-muted-foreground focus:outline-none hover:cursor-grab"
        strokeWidth={1.5}
      />
      <div className="flex gap-2 items-center flex-grow">
        {getIcon(section.type)}
        <div className="flex flex-col">
          <span className="font-semibold capitalize">{section.type}</span>
          {section.type === "text" && (
            <span className="text-xs truncate w-20">{section.text}</span>
          )}
        </div>
      </div>
      <SquarePenIcon
        onClick={onClick}
        className="text-muted-foreground hover:cursor-pointer hover:text-primary"
        strokeWidth={1.5}
      />
      <TrashIcon
        className="text-muted-foreground hover:cursor-pointer hover:text-destructive flex-shrink-0"
        strokeWidth={1.5}
        onClick={handleDeleteSection}
      />
    </div>
  );
}

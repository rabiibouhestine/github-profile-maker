import {
  Grip as GripIcon,
  SquarePen as SquarePenIcon,
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
} from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Section } from "@/lib/types";

type SectionCardProps = {
  id: string;
  section: Section;
  isSelected: boolean;
  onClick: () => void;
};

export default function SectionCard({
  id,
  section,
  isSelected,
  onClick,
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
      case "image":
        return <ImageIcon />;
      default:
        return <SquareDashedIcon />;
    }
  }

  return (
    <div
      onClick={onClick}
      ref={setNodeRef}
      style={style}
      className={
        (isSelected ? "border-blue-500 " : "") +
        "border rounded-sm p-2 flex items-center gap-4 min-h-16 hover:border-blue-500 hover:text-primary hover:cursor-pointer group"
      }
    >
      <GripIcon
        {...attributes}
        {...listeners}
        className="text-muted-foreground focus:outline-none hover:cursor-grab"
        strokeWidth={1.5}
      />
      <div className="flex gap-2 items-center">
        {getIcon(section.type)}
        <div className="flex flex-col">
          <span className="font-semibold capitalize">{section.type}</span>
          {section.type === "text" && (
            <span className="text-xs truncate w-40">{section.text}</span>
          )}
        </div>
      </div>
      <SquarePenIcon
        className={
          (isSelected ? "text-blue-500 " : "text-muted-foreground ") +
          "ml-auto group-hover:text-blue-500"
        }
        strokeWidth={1.5}
      />
    </div>
  );
}

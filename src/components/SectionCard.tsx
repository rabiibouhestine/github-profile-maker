import {
  Grip as GripIcon,
  SquarePen as SquarePenIcon,
  Type as TextIcon,
  Image as ImageIcon,
  SquareDashed as SquareDashedIcon,
} from "lucide-react";

import type { Section } from "@/lib/types";

type SectionCardProps = {
  section: Section;
  isSelected: boolean;
  onClick: () => void;
};

export default function SectionCard({
  section,
  isSelected,
  onClick,
}: SectionCardProps) {
  function getIcon(type?: string) {
    switch (type) {
      case "text":
        return <TextIcon />;
      case "image":
        return <ImageIcon />;
      default:
        return <SquareDashedIcon />;
    }
  }

  return (
    <div
      onClick={onClick}
      className={
        (isSelected ? "border-blue-500 " : "") +
        "border rounded-sm p-2 flex items-center gap-4 h-16 hover:border-blue-500 hover:text-primary hover:cursor-pointer group"
      }
    >
      <GripIcon
        className="text-muted-foreground hover:cursor-grab"
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

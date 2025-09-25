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
      className={
        (isSelected ? "border-blue-500 " : "") +
        "border rounded-sm p-2 flex items-center gap-4 h-16"
      }
    >
      <GripIcon className="text-muted-foreground" strokeWidth={1.5} />
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
        className="text-muted-foreground ml-auto hover:cursor-pointer hover:text-primary"
        strokeWidth={1.5}
        onClick={onClick}
      />
    </div>
  );
}

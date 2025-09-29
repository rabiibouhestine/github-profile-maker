import {
  Trash as TrashIcon,
  Grip as GripIcon,
  SquarePen as SquarePenIcon,
} from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { Section, BadgesSection } from "@/lib/types";

type BadgeCardProps = {
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  selectedSectionID: number;
  id: number;
  label: string;
  message: string;
  color: string;
};

export default function BadgeCard({
  setSections,
  selectedSectionID,
  id,
  label,
  message,
  color,
}: BadgeCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = () => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== selectedSectionID) return section;
        if (section.type !== "badges") return section;

        return {
          ...section,
          list: section.list.filter((badge) => badge.id !== id),
        } as BadgesSection;
      })
    );
  };

  return (
    <div
      className="border rounded-sm p-2 flex items-center gap-4 min-h-16"
      ref={setNodeRef}
      style={style}
    >
      <GripIcon
        {...attributes}
        {...listeners}
        className="text-muted-foreground focus:outline-none hover:cursor-grab"
        strokeWidth={1.5}
      />
      <div className="flex gap-2 items-center grow">
        <img
          src={`https://img.shields.io/badge/${label}-${message}-${color}`}
        />
      </div>
      <SquarePenIcon
        className="text-muted-foreground hover:cursor-pointer hover:text-primary"
        strokeWidth={1.5}
        onClick={handleDelete}
      />
      <TrashIcon
        className="text-muted-foreground hover:cursor-pointer hover:text-destructive"
        strokeWidth={1.5}
        onClick={handleDelete}
      />
    </div>
  );
}

import { Trash as TrashIcon, Grip as GripIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import type { Section, StackSection } from "@/lib/types";

type TechCardProps = {
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  selectedSectionID: number;
  name: string;
  selected: string;
  versions: string[];
};

export default function TechCard({
  setSections,
  selectedSectionID,
  name,
  selected,
  versions,
}: TechCardProps) {
  const handleDelete = () => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== selectedSectionID) return section;
        if (section.type !== "stack") return section; // only modify stack sections

        return {
          ...section,
          list: section.list.filter((tech) => tech.name !== name),
        } as StackSection;
      })
    );
  };

  const handleVersionChange = (newValue: string) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== selectedSectionID) return section;
        if (section.type !== "stack") return section;

        return {
          ...section,
          list: section.list.map((tech) =>
            tech.name === name ? { ...tech, selected: newValue } : tech
          ),
        } as StackSection;
      })
    );
  };

  return (
    <div className="border rounded-sm p-2 flex items-center gap-4 min-h-16">
      <GripIcon
        className="text-muted-foreground focus:outline-none hover:cursor-grab"
        strokeWidth={1.5}
      />
      <div className="flex gap-2 items-center">
        <img
          src={
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/" +
            name +
            "/" +
            name +
            "-" +
            selected +
            ".svg"
          }
          height={32}
          width={32}
        />
        <span className="truncate w-full">{name}</span>
      </div>
      <Select value={selected} onValueChange={handleVersionChange}>
        <SelectTrigger className="ml-auto"></SelectTrigger>
        <SelectContent>
          {versions.map((version) => (
            <SelectItem value={version}>
              {" "}
              <img
                src={
                  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/" +
                  name +
                  "/" +
                  name +
                  "-" +
                  version +
                  ".svg"
                }
                height={32}
                width={32}
              />
              {version}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <TrashIcon
        className="text-muted-foreground hover:cursor-pointer hover:text-destructive"
        strokeWidth={1.5}
        onClick={handleDelete}
      />
    </div>
  );
}

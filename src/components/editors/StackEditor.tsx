import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddTech from "@/components/AddTech";
import TechCard from "@/components/TechCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash as TrashIcon } from "lucide-react";

import type { Section, AlignType, StackSection } from "@/lib/types";

type StackEditorProps = {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  selectedSectionID: number;
  setSelectedSectionID: React.Dispatch<React.SetStateAction<number>>;
};

export default function StackEditor({
  sections,
  setSections,
  selectedSectionID,
  setSelectedSectionID,
}: StackEditorProps) {
  const selectedSection = sections.find(
    (s): s is StackSection => s.id === selectedSectionID
  );

  const align = selectedSection?.align || "center";
  const size = selectedSection?.size || 40;
  const list = selectedSection?.list || [];

  function onAlignChange(val: AlignType) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, align: val } : s))
    );
  }

  function onHeightChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value;
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, text: val } : s))
    );
  }

  function handleDeleteSection() {
    setSections((prev) => {
      const newSections = prev.filter((s) => s.id !== selectedSectionID);

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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Align</Label>
        <Select value={align} onValueChange={onAlignChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="right">Right</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="left">Left</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Icon Size</Label>
        <Input
          type="number"
          placeholder="40"
          id="message"
          value={size}
          onChange={onHeightChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Stack</Label>
        {list.map((technology) => (
          <TechCard
            key={technology.name}
            setSections={setSections}
            selectedSectionID={selectedSectionID}
            name={technology.name}
            selected={technology.selected}
            versions={technology.versions}
          />
        ))}
      </div>
      <AddTech
        setSections={setSections}
        selectedSectionID={selectedSectionID}
      />
      <Button variant="destructive" size={"lg"} onClick={handleDeleteSection}>
        <TrashIcon />
        Delete Section
      </Button>
    </div>
  );
}

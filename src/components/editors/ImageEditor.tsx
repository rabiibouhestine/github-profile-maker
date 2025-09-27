import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash as TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

import type { Section, ImageSection, AlignType } from "@/lib/types";

type ImageEditorProps = {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  selectedSectionID: number;
  setSelectedSectionID: React.Dispatch<React.SetStateAction<number>>;
};

export default function ImageEditor({
  sections,
  setSections,
  selectedSectionID,
  setSelectedSectionID,
}: ImageEditorProps) {
  const selectedSection = sections.find(
    (s): s is ImageSection => s.id === selectedSectionID
  );

  const url = selectedSection?.url || "";
  const align = selectedSection?.align || "left";
  const height = selectedSection?.height || 200;

  function onUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value;
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, url: val } : s))
    );
  }

  function onAlignChange(val: AlignType) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, align: val } : s))
    );
  }

  function onHeightChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(event.target.value);
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, height: val } : s))
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
    <div className="h-full flex flex-col gap-4 pb-3">
      <div className="flex flex-col gap-2">
        <Label>Image URL</Label>
        <Input
          type="text"
          placeholder="https://image.com"
          value={url}
          onChange={onUrlChange}
        />
      </div>
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
        <Label>Height</Label>
        <Input
          type="number"
          placeholder="200"
          value={height}
          onChange={onHeightChange}
        />
      </div>
      <Button variant="destructive" size={"lg"} onClick={handleDeleteSection}>
        <TrashIcon />
        Delete Section
      </Button>
    </div>
  );
}

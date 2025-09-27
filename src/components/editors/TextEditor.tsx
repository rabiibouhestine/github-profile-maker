import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash as TrashIcon } from "lucide-react";

import type { Section, TextSection, TagType, AlignType } from "@/lib/types";

type TextEditorProps = {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  selectedSectionID: number;
  setSelectedSectionID: React.Dispatch<React.SetStateAction<number>>;
};

export default function TextEditor({
  sections,
  setSections,
  selectedSectionID,
  setSelectedSectionID,
}: TextEditorProps) {
  const selectedSection = sections.find(
    (s): s is TextSection => s.id === selectedSectionID
  );

  const tag = selectedSection?.tag || "h1";
  const align = selectedSection?.align || "center";
  const text = selectedSection?.text || "Hello World";

  function onTagChange(val: TagType) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, tag: val } : s))
    );
  }

  function onAlignChange(val: AlignType) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, align: val } : s))
    );
  }

  function onTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
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
    <div className="flex flex-col gap-4 pb-3">
      <div className="flex flex-col gap-2">
        <Label>Tag</Label>
        <Select value={tag} onValueChange={onTagChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="h1">H1</SelectItem>
            <SelectItem value="h2">H2</SelectItem>
            <SelectItem value="h3">H3</SelectItem>
            <SelectItem value="h4">H4</SelectItem>
            <SelectItem value="h5">H5</SelectItem>
            <SelectItem value="h6">H6</SelectItem>
            <SelectItem value="p">P</SelectItem>
          </SelectContent>
        </Select>
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
        <Label>Text</Label>
        <Textarea
          placeholder="Type your message here."
          id="message"
          value={text}
          onChange={onTextChange}
        />
      </div>
      <Button variant="destructive" size={"lg"} onClick={handleDeleteSection}>
        <TrashIcon />
        Delete Section
      </Button>
    </div>
  );
}

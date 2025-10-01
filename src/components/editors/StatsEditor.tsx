import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import type { Section, AlignType, StatsSection } from "@/lib/types";

type StatsEditorProps = {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  selectedSectionID: number;
};

export default function StatsEditor({
  sections,
  setSections,
  selectedSectionID,
}: StatsEditorProps) {
  const selectedSection = sections.find(
    (s): s is StatsSection => s.id === selectedSectionID
  );

  const username = selectedSection?.username || "rabiibouhestine";
  const align = selectedSection?.align || "center";

  function onAlignChange(val: AlignType) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, align: val } : s))
    );
  }

  function onTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value;
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, username: val } : s
      )
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-3">
      <div className="flex flex-col gap-2">
        <Label>Github Username</Label>
        <Input
          placeholder="Type your github username here."
          id="message"
          value={username}
          onChange={onTextChange}
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
    </div>
  );
}

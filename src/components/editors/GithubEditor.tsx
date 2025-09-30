import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import type {
  Section,
  AlignType,
  TrophiesSection,
  ActivitySection,
} from "@/lib/types";

type GithubEditorProps = {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  selectedSectionID: number;
};

export default function GithubEditor({
  sections,
  setSections,
  selectedSectionID,
}: GithubEditorProps) {
  const selectedSection = sections.find(
    (s): s is TrophiesSection | ActivitySection => s.id === selectedSectionID
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

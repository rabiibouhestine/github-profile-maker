import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSections } from "@/components/hooks/SectionsProvider";

import type { TextSection, TagType, AlignType } from "@/lib/types";

export default function TextEditor() {
  const { sections, setSections, selectedSectionID } = useSections();

  const selectedSection = sections.find(
    (s): s is TextSection => s.id === selectedSectionID && s.type === "text"
  );

  const tag = selectedSection?.tag || "h1";
  const align = selectedSection?.align || "center";
  const text = selectedSection?.text || "";

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
          placeholder="Type your text here."
          id="message"
          value={text}
          onChange={onTextChange}
        />
      </div>
    </div>
  );
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSections } from "@/components/hooks/SectionsProvider";

import type { ImageSection, AlignType } from "@/lib/types";

export default function ImageEditor() {
  const { sections, setSections, selectedSectionID } = useSections();

  const selectedSection = sections.find(
    (s): s is ImageSection => s.id === selectedSectionID && s.type === "image"
  );

  const url = selectedSection?.url ?? "";
  const align = selectedSection?.align ?? "left";
  const height = selectedSection?.height ?? 200;

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
    </div>
  );
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { trophyThemes } from "@/resources/themes";
import { useSections } from "@/components/hooks/SectionsProvider";

import type { Option } from "@/components/ui/MultiSelect";
import type { AlignType, TrophiesSection } from "@/lib/types";

const trophies: Option[] = [
  { value: "Commits", label: "Commits" },
  { value: "Reviews", label: "Reviews" },
  { value: "Experience", label: "Experience" },
  { value: "Issues", label: "Issues" },
  { value: "PullRequest", label: "PullRequest" },
  { value: "Stars", label: "Stars" },
  { value: "Repositories", label: "Repositories" },
  { value: "Followers", label: "Followers" },
];

const ranks: Option[] = [
  { value: "SECRET", label: "SECRET" },
  { value: "SSS", label: "SSS" },
  { value: "SS", label: "SS" },
  { value: "S", label: "S" },
  { value: "AAA", label: "AAA" },
  { value: "AA", label: "AA" },
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
];

export default function TrophiesEditor() {
  const { sections, setSections, selectedSectionID } = useSections();

  const selectedSection = sections.find(
    (s): s is TrophiesSection =>
      s.id === selectedSectionID && s.type === "trophies"
  );

  const username = selectedSection?.username;
  const align = selectedSection?.align;
  const theme = selectedSection?.theme;
  const title = selectedSection?.title || [];
  const rank = selectedSection?.rank || [];
  const column = selectedSection?.column;
  const row = selectedSection?.row;
  const marginW = selectedSection?.marginW;
  const marginH = selectedSection?.marginH;
  const bg = selectedSection?.bg;
  const frame = selectedSection?.frame;

  function onUserChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value;
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, username: val } : s
      )
    );
  }

  function onAlignChange(val: AlignType) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, align: val } : s))
    );
  }

  function onThemeChange(val: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, theme: val } : s))
    );
  }

  function onTitleChange(val: string[]) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, title: val } : s))
    );
  }

  function onRankChange(val: string[]) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, rank: val } : s))
    );
  }

  function onColumnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(event.target.value);
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, column: val } : s))
    );
  }

  function onRowChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(event.target.value);
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, row: val } : s))
    );
  }

  function onMarginWChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(event.target.value);
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, marginW: val } : s))
    );
  }

  function onMarginHChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(event.target.value);
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, marginH: val } : s))
    );
  }

  function onBgChange(val: boolean) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, bg: val } : s))
    );
  }

  function onFrameChange(val: boolean) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, frame: val } : s))
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
          onChange={onUserChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Align</Label>
        <Select value={align} onValueChange={onAlignChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Align" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="right">Right</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="left">Left</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Theme</Label>
        <Select value={theme} onValueChange={onThemeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {trophyThemes.map((theme) => {
              const label = theme
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase());
              return (
                <SelectItem key={theme} value={theme}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Trophies</Label>
        <MultiSelect
          options={trophies}
          value={title}
          onChange={onTitleChange}
          placeholder="Select Trophies"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Ranks</Label>
        <MultiSelect
          options={ranks}
          value={rank}
          onChange={onRankChange}
          placeholder="Select Ranks"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Columns</Label>
        <Input
          type="number"
          placeholder="8"
          value={column}
          onChange={onColumnChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Rows</Label>
        <Input
          type="number"
          placeholder="1"
          value={row}
          onChange={onRowChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Margin Width</Label>
        <Input
          type="number"
          placeholder="8"
          value={marginW}
          onChange={onMarginWChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Margin Height</Label>
        <Input
          type="number"
          placeholder="8"
          value={marginH}
          onChange={onMarginHChange}
        />
      </div>
      <div className="flex items-center justify-between mt-3">
        <Label htmlFor="background">Show Background</Label>
        <Switch id="background" checked={bg} onCheckedChange={onBgChange} />
      </div>
      <div className="flex items-center justify-between mb-3">
        <Label htmlFor="frame">Show Frame</Label>
        <Switch id="frame" checked={frame} onCheckedChange={onFrameChange} />
      </div>
    </div>
  );
}

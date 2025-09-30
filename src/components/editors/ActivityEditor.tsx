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

import type { Section, AlignType, ActivitySection } from "@/lib/types";

type ActivityEditorProps = {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  selectedSectionID: number;
};

const themes = [
  "redical",
  "coral",
  "nord",
  "lucent",
  "dracula",
  "gruvbox",
  "chartreuse-dark",
  "github-light",
  "github-dark",
  "github-dark-dimmed",
  "minimal",
  "material-palenight",
  "green",
  "gotham",
  "noctis-minimus",
  "monokai",
  "one-dark",
  "elegant",
  "aqua",
  "synthwave-84",
  "react",
  "merko",
  "vue",
  "tokyo-day",
  "tokyo-night",
  "high-contrast",
  "cobalt",
  "material",
  "nightowl",
  "modern-lilac",
  "arctic",
];

export default function ActivityEditor({
  sections,
  setSections,
  selectedSectionID,
}: ActivityEditorProps) {
  const selectedSection = sections.find(
    (s): s is ActivitySection => s.id === selectedSectionID
  );

  const username = selectedSection?.username;
  const align = selectedSection?.align;
  const custom_title = selectedSection?.custom_title;
  const theme = selectedSection?.theme;
  const radius = selectedSection?.radius;
  const height = selectedSection?.height;
  const days = selectedSection?.days;
  const area = selectedSection?.area;
  const hide_border = selectedSection?.hide_border;
  const hide_title = selectedSection?.hide_title;
  const grid = selectedSection?.grid;

  function onUserChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value;
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, username: val } : s
      )
    );
  }

  function onTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value;
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, custom_title: val } : s
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

  function onRadiusChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(event.target.value);
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, radius: val } : s))
    );
  }

  function onHeightChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(event.target.value);
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, height: val } : s))
    );
  }

  function onDaysChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(event.target.value);
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, days: val } : s))
    );
  }

  function onAreaChange(val: boolean) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, area: val } : s))
    );
  }

  function onHideBorderChange(val: boolean) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, hide_border: !val } : s
      )
    );
  }

  function onHideTitleChange(val: boolean) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, hide_title: !val } : s
      )
    );
  }

  function onGridChange(val: boolean) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, grid: val } : s))
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-3">
      <div className="flex flex-col gap-2">
        <Label>Github Username</Label>
        <Input
          placeholder="Type your github username here."
          id="username"
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
        <Label>Custom Title</Label>
        <Input
          placeholder="My Contribution Graph"
          id="custom_title"
          value={custom_title}
          onChange={onTitleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Theme</Label>
        <Select value={theme} onValueChange={onThemeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme} value={theme}>
                {theme}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Radius</Label>
        <Input
          type="number"
          placeholder="16"
          value={radius}
          onChange={onRadiusChange}
        />
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
      <div className="flex flex-col gap-2">
        <Label>Days</Label>
        <Input
          type="number"
          placeholder="40"
          value={days}
          onChange={onDaysChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="area">Show Area</Label>
        <Switch id="area" checked={area} onCheckedChange={onAreaChange} />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="hide_border">Show Border</Label>
        <Switch
          id="hide_border"
          checked={!hide_border}
          onCheckedChange={onHideBorderChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="hide_title">Show Title</Label>
        <Switch
          id="hide_title"
          checked={!hide_title}
          onCheckedChange={onHideTitleChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="grid">Show Grid</Label>
        <Switch id="grid" checked={grid} onCheckedChange={onGridChange} />
      </div>
    </div>
  );
}

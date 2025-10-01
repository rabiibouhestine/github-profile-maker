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

import { languagesThemes } from "@/resources/themes";

import type { Section, AlignType, LanguagesSection } from "@/lib/types";

type LanguagesEditorProps = {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  selectedSectionID: number;
};

export default function LanguagesEditor({
  sections,
  setSections,
  selectedSectionID,
}: LanguagesEditorProps) {
  const selectedSection = sections.find(
    (s): s is LanguagesSection => s.id === selectedSectionID
  );

  const username = selectedSection?.username;
  const align = selectedSection?.align;
  const custom_title = selectedSection?.custom_title;
  const theme = selectedSection?.theme;
  const layout = selectedSection?.layout;
  const stats_format = selectedSection?.stats_format;
  const langs_count = selectedSection?.langs_count;
  const card_width = selectedSection?.card_width;
  const border_radius = selectedSection?.border_radius;
  const hide_title = selectedSection?.hide_title;
  const hide_progress = selectedSection?.hide_progress;
  const disable_animations = selectedSection?.disable_animations;

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

  function onTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value;
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, custom_title: val } : s
      )
    );
  }

  function onThemeChange(val: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, theme: val } : s))
    );
  }

  function onLayoutChange(val: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, layout: val } : s))
    );
  }

  function onFormatChange(val: string) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, stats_format: val } : s
      )
    );
  }

  function onCountChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(event.target.value);
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, langs_count: val } : s
      )
    );
  }

  function onWidthChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(event.target.value);
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, card_width: val } : s
      )
    );
  }

  function onRadiusChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(event.target.value);
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, border_radius: val } : s
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

  function onHideProgressChange(val: boolean) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, hide_progress: !val } : s
      )
    );
  }

  function onDisableAnimationChange(val: boolean) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, disable_animations: !val } : s
      )
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
            {languagesThemes.map((theme) => {
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
        <Label>Layout</Label>
        <Select value={layout} onValueChange={onLayoutChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="compact">Compact</SelectItem>
            <SelectItem value="donut">Donut</SelectItem>
            <SelectItem value="donut-vertical">Donut Vertical</SelectItem>
            <SelectItem value="pie">Pie</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Format</Label>
        <Select value={stats_format} onValueChange={onFormatChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="percentages">Percentages</SelectItem>
            <SelectItem value="bytes">Bytes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Number of Languages</Label>
        <Input
          type="number"
          placeholder="5"
          value={langs_count}
          onChange={onCountChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Card Width</Label>
        <Input
          type="number"
          placeholder="300"
          value={card_width}
          onChange={onWidthChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Border Radius</Label>
        <Input
          type="number"
          placeholder="4.5"
          value={border_radius}
          onChange={onRadiusChange}
        />
      </div>
      <div className="flex items-center justify-between mt-3">
        <Label htmlFor="hide_title">Show Title</Label>
        <Switch
          id="hide_title"
          checked={!hide_title}
          onCheckedChange={onHideTitleChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="hide_progress">Show Progress</Label>
        <Switch
          id="hide_progress"
          checked={!hide_progress}
          onCheckedChange={onHideProgressChange}
        />
      </div>
      <div className="flex items-center justify-between mb-3">
        <Label htmlFor="disable_animations">Enable Animations</Label>
        <Switch
          id="disable_animations"
          checked={!disable_animations}
          onCheckedChange={onDisableAnimationChange}
        />
      </div>
    </div>
  );
}

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
import { useSections } from "@/components/hooks/SectionsProvider";

import { languagesThemes } from "@/resources/themes";

import type { AlignType, LanguagesSection } from "@/lib/types";

export default function LanguagesEditor() {
  const { sections, setSections, selectedSectionID } = useSections();

  const selectedSection = sections.find(
    (s): s is LanguagesSection =>
      s.id === selectedSectionID && s.type === "image"
  );

  const username = selectedSection?.username ?? "rabiibouhestine";
  const align = selectedSection?.align ?? "center";
  const custom_title = selectedSection?.custom_title ?? "Most Used Languages";
  const theme = selectedSection?.theme ?? "dracula";
  const layout = selectedSection?.layout ?? "normal";
  const stats_format = selectedSection?.stats_format ?? "percentages";
  const langs_count = selectedSection?.langs_count ?? 5;
  const card_width = selectedSection?.card_width ?? 300;
  const border_radius = selectedSection?.border_radius ?? 4.5;
  const hide_title = selectedSection?.hide_title ?? false;
  const hide_progress = selectedSection?.hide_progress ?? false;
  const hide_border = selectedSection?.hide_border ?? false;
  const disable_animations = selectedSection?.disable_animations ?? false;

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

  function onHideBorderChange(val: boolean) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, hide_border: !val } : s
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
        <Label htmlFor="username">Github Username</Label>
        <Input
          id="username"
          autoComplete="off"
          placeholder="Type your github username here."
          value={username}
          onChange={onUserChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="align">Align</Label>
        <Select value={align} onValueChange={onAlignChange}>
          <SelectTrigger id="align" className="w-full">
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
        <Label htmlFor="custom_title">Title</Label>
        <Input
          id="custom_title"
          autoComplete="off"
          placeholder="My Contribution Graph"
          value={custom_title}
          onChange={onTitleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="theme">Theme</Label>
        <Select value={theme} onValueChange={onThemeChange}>
          <SelectTrigger id="theme" className="w-full">
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
        <Label htmlFor="layout">Layout</Label>
        <Select value={layout} onValueChange={onLayoutChange}>
          <SelectTrigger id="layout" className="w-full">
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
        <Label htmlFor="format">Format</Label>
        <Select value={stats_format} onValueChange={onFormatChange}>
          <SelectTrigger id="format" className="w-full">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="percentages">Percentages</SelectItem>
            <SelectItem value="bytes">Bytes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="langs_count">Number of Languages</Label>
        <Input
          id="langs_count"
          type="number"
          placeholder="5"
          value={langs_count}
          onChange={onCountChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="card_width">Card Width</Label>
        <Input
          id="card_width"
          type="number"
          placeholder="300"
          value={card_width}
          onChange={onWidthChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="border_radius">Border Radius</Label>
        <Input
          id="border_radius"
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
      <div className="flex items-center justify-between">
        <Label htmlFor="hide_border">Show Border</Label>
        <Switch
          id="hide_border"
          checked={!hide_border}
          onCheckedChange={onHideBorderChange}
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

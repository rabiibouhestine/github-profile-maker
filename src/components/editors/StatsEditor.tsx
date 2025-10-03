import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { Switch } from "@/components/ui/switch";
import { useSections } from "@/components/hooks/SectionsProvider";

import { statsThemes } from "@/resources/themes";

import type { Option } from "@/components/ui/MultiSelect";
import type { AlignType, StatsSection } from "@/lib/types";

const extraStats: Option[] = [
  { value: "reviews", label: "Reviews" },
  { value: "discussions_started", label: "Discussions Started" },
  { value: "discussions_answered", label: "Discussions Answered" },
  { value: "prs_merged", label: "PRs Merged" },
  { value: "prs_merged_percentage", label: "PRs Merged Percentage" },
];

export default function StatsEditor() {
  const { sections, setSections, selectedSectionID } = useSections();

  const selectedSection = sections.find(
    (s): s is StatsSection => s.id === selectedSectionID && s.type === "stats"
  );

  const username = selectedSection?.username ?? "rabiibouhestine";
  const align = selectedSection?.align ?? "center";
  const theme = selectedSection?.theme ?? "dracula";
  const rank_icon = selectedSection?.rank_icon ?? "default";
  const number_format = selectedSection?.number_format ?? "short";
  const show = selectedSection?.show ?? [];
  const custom_title = selectedSection?.custom_title ?? "Github Stats";
  const border_radius = selectedSection?.border_radius ?? 4.5;
  const card_width = selectedSection?.card_width ?? 500;
  const hide_border = selectedSection?.hide_border ?? false;
  const hide_title = selectedSection?.hide_title ?? false;
  const hide_rank = selectedSection?.hide_rank ?? false;
  const show_icons = selectedSection?.show_icons ?? true;
  const include_all_commits = selectedSection?.include_all_commits ?? true;
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

  function onThemeChange(val: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, theme: val } : s))
    );
  }

  function onRankIconChange(val: string) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, rank_icon: val } : s
      )
    );
  }

  function onNumberFormatChange(val: string) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, number_format: val } : s
      )
    );
  }

  function onExtraStatsChange(val: string[]) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, show: val } : s))
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

  function onRadiusChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(event.target.value);
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, border_radius: val } : s
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

  function onHideRankChange(val: boolean) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, hide_rank: !val } : s
      )
    );
  }

  function onShowIconsChange(val: boolean) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, show_icons: val } : s
      )
    );
  }

  function onIncludeCommitsChange(val: boolean) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, include_all_commits: val } : s
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
        <Label htmlFor="theme">Theme</Label>
        <Select value={theme} onValueChange={onThemeChange}>
          <SelectTrigger id="theme" className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {statsThemes.map((theme) => {
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
        <Label htmlFor="rank_icon">Rank Icon</Label>
        <Select value={rank_icon} onValueChange={onRankIconChange}>
          <SelectTrigger id="rank_icon" className="w-full">
            <SelectValue placeholder="Rank Icon" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="github">Github</SelectItem>
            <SelectItem value="percentile">Percentile</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="number_format">Number Format</Label>
        <Select value={number_format} onValueChange={onNumberFormatChange}>
          <SelectTrigger id="number_format" className="w-full">
            <SelectValue placeholder="Number Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Short</SelectItem>
            <SelectItem value="long">Long</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Extra Stats</span>
        <MultiSelect
          options={extraStats}
          value={show}
          onChange={onExtraStatsChange}
          placeholder="Select Extra Stats"
        />
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
        <Label htmlFor="border_radius">Border Radius</Label>
        <Input
          id="border_radius"
          type="number"
          placeholder="4.5"
          value={border_radius}
          onChange={onRadiusChange}
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
      <div className="flex items-center justify-between mt-3">
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
        <Label htmlFor="hide_rank">Show Rank</Label>
        <Switch
          id="hide_rank"
          checked={!hide_rank}
          onCheckedChange={onHideRankChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="show_icons">Show Icons</Label>
        <Switch
          id="show_icons"
          checked={show_icons}
          onCheckedChange={onShowIconsChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="include_all_commits">Include All Commits</Label>
        <Switch
          id="include_all_commits"
          checked={include_all_commits}
          onCheckedChange={onIncludeCommitsChange}
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

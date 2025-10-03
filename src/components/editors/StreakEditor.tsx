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
import { useSections } from "@/components/hooks/SectionsProvider";

import type { Option } from "@/components/ui/MultiSelect";
import type { AlignType, StreakSection } from "@/lib/types";

import { streakThemes } from "@/resources/themes";

const days: Option[] = [
  { value: "Sun", label: "Sunday" },
  { value: "Mon", label: "Monday" },
  { value: "Tue", label: "Tuesday" },
  { value: "Wed", label: "Wednesday" },
  { value: "Thu", label: "Thursday" },
  { value: "Fri", label: "Friday" },
  { value: "Sat", label: "Saturday" },
];

export default function StreakEditor() {
  const { sections, setSections, selectedSectionID } = useSections();

  const selectedSection = sections.find(
    (s): s is StreakSection => s.id === selectedSectionID && s.type === "streak"
  );

  const username = selectedSection?.username ?? "rabiibouhestine";
  const align = selectedSection?.align ?? "center";
  const theme = selectedSection?.theme ?? "dracula";
  const mode = selectedSection?.mode ?? "daily";
  const exclude_days = selectedSection?.exclude_days ?? [];
  const card_width = selectedSection?.card_width ?? 495;
  const card_height = selectedSection?.card_height ?? 195;
  const border_radius = selectedSection?.border_radius ?? 4.5;
  const short_numbers = selectedSection?.short_numbers ?? true;
  const disable_animations = selectedSection?.disable_animations ?? false;
  const hide_border = selectedSection?.hide_border ?? false;
  const hide_total_contributions =
    selectedSection?.hide_total_contributions ?? false;
  const hide_current_streak = selectedSection?.hide_current_streak ?? false;
  const hide_longest_streak = selectedSection?.hide_longest_streak ?? false;

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

  function onModeChange(val: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, mode: val } : s))
    );
  }

  function onExcludeDaysChange(val: string[]) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, exclude_days: val } : s
      )
    );
  }

  function onCardWidthChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(event.target.value);
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, card_width: val } : s
      )
    );
  }

  function onCardHeightChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(event.target.value);
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, card_height: val } : s
      )
    );
  }

  function onBorderRadiusChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(event.target.value);
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, border_radius: val } : s
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

  function onShortNumbersChange(val: boolean) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, short_numbers: val } : s
      )
    );
  }

  function onHideTotalContributionsChange(val: boolean) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID
          ? { ...s, hide_total_contributions: !val }
          : s
      )
    );
  }

  function onHideCurrentStreakChange(val: boolean) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, hide_current_streak: !val } : s
      )
    );
  }

  function onHideLongestStreakChange(val: boolean) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, hide_longest_streak: !val } : s
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
        <Label htmlFor="theme">Theme</Label>
        <Select value={theme} onValueChange={onThemeChange}>
          <SelectTrigger id="theme" className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {streakThemes.map((theme) => {
              const label = theme
                .replace(/-/g, " ")
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
        <Label htmlFor="mode">Mode</Label>
        <Select value={mode} onValueChange={onModeChange}>
          <SelectTrigger id="mode" className="w-full">
            <SelectValue placeholder="mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Exclude Days</span>
        <MultiSelect
          options={days}
          value={exclude_days}
          onChange={onExcludeDaysChange}
          placeholder="Select Days"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="card_width">Card Width</Label>
        <Input
          id="card_width"
          type="number"
          placeholder="495"
          value={card_width}
          onChange={onCardWidthChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="card_height">Card Height</Label>
        <Input
          id="card_height"
          type="number"
          placeholder="195"
          value={card_height}
          onChange={onCardHeightChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="border_radius">Border Radius</Label>
        <Input
          id="border_radius"
          type="number"
          placeholder="4.5"
          value={border_radius}
          onChange={onBorderRadiusChange}
        />
      </div>
      <div className="flex items-center justify-between mt-3">
        <Label htmlFor="disable_animations">Enable Animations</Label>
        <Switch
          id="disable_animations"
          checked={!disable_animations}
          onCheckedChange={onDisableAnimationChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="short_numbers">Use Short Numbers</Label>
        <Switch
          id="short_numbers"
          checked={short_numbers}
          onCheckedChange={onShortNumbersChange}
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
      <div className="flex items-center justify-between">
        <Label htmlFor="hide_total_contributions">
          Show Total Contributions
        </Label>
        <Switch
          id="hide_total_contributions"
          checked={!hide_total_contributions}
          onCheckedChange={onHideTotalContributionsChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="hide_current_streak">Show Current Streak</Label>
        <Switch
          id="hide_current_streak"
          checked={!hide_current_streak}
          onCheckedChange={onHideCurrentStreakChange}
        />
      </div>
      <div className="flex items-center justify-between mb-3">
        <Label htmlFor="hide_longest_streak">Show Longest Streak</Label>
        <Switch
          id="hide_longest_streak"
          checked={!hide_longest_streak}
          onCheckedChange={onHideLongestStreakChange}
        />
      </div>
    </div>
  );
}

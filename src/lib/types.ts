export type TagType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
export type AlignType = "left" | "center" | "right";

type BaseSection = {
  id: number;
};

export type TextSection = BaseSection & {
  type: "text";
  tag: TagType;
  align: AlignType;
  text: string;
};

export type TrophiesSection = BaseSection & {
  type: "trophies";
  username: string;
  align: AlignType;
  theme: string;
  title: string[];
  rank: string[];
  column: number;
  row: number;
  marginW: number;
  marginH: number;
  bg: boolean;
  frame: boolean;
};

export type ActivitySection = BaseSection & {
  type: "activity";
  username: string;
  align: AlignType;
  custom_title: string;
  theme: string;
  radius: number;
  height: number;
  days: number;
  area: boolean;
  hide_border: boolean;
  hide_title: boolean;
  grid: boolean;
};

export type StreakSection = BaseSection & {
  type: "streak";
  username: string;
  align: AlignType;
  theme: string;
  hide_border: boolean;
  border_radius: number;
  short_numbers: boolean;
  mode: string;
  exclude_days: string[];
  disable_animations: boolean;
  card_width: number;
  card_height: number;
  hide_total_contributions: boolean;
  hide_current_streak: boolean;
  hide_longest_streak: boolean;
};

export type LanguagesSection = BaseSection & {
  type: "languages";
  username: string;
  align: AlignType;
  theme: string;
  custom_title: string;
  layout: string;
  stats_format: string;
  langs_count: number;
  card_width: number;
  border_radius: number;
  hide_title: boolean;
  hide_progress: boolean;
  hide_border: boolean;
  disable_animations: boolean;
};

export type StatsSection = BaseSection & {
  type: "stats";
  username: string;
  align: AlignType;
};

export type ImageSection = BaseSection & {
  type: "image";
  align: AlignType;
  url: string;
  height: number;
};

export type Tech = {
  name: string;
  selected: string;
  versions: string[];
};

export type StackSection = BaseSection & {
  type: "stack";
  align: AlignType;
  size: number;
  list: Tech[];
};

export type Social = {
  name: string;
  link: string;
};

export type SocialsSection = BaseSection & {
  type: "socials";
  align: AlignType;
  size: number;
  list: Social[];
};

export type Badge = {
  id: number;
  label: string;
  message: string;
  color: string;
};

export type BadgesSection = BaseSection & {
  type: "badges";
  align: AlignType;
  list: Badge[];
};

export type Section =
  | TextSection
  | TrophiesSection
  | ActivitySection
  | StreakSection
  | LanguagesSection
  | StatsSection
  | StackSection
  | SocialsSection
  | BadgesSection
  | ImageSection;

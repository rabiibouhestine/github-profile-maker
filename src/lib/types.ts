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
};

export type ActivitySection = BaseSection & {
  type: "activity";
  username: string;
  align: AlignType;
};

export type StreakSection = BaseSection & {
  type: "streak";
  username: string;
  align: AlignType;
};

export type LanguagesSection = BaseSection & {
  type: "languages";
  username: string;
  align: AlignType;
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

export type Section =
  | TextSection
  | TrophiesSection
  | ActivitySection
  | StreakSection
  | LanguagesSection
  | StatsSection
  | StackSection
  | ImageSection;

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

export type ImageSection = BaseSection & {
  type: "image";
  align: AlignType;
  url: string;
  height: number;
};

export type Section =
  | TextSection
  | TrophiesSection
  | ActivitySection
  | ImageSection;

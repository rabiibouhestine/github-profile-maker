import type {
  Section,
  TextSection,
  TrophiesSection,
  ActivitySection,
  StreakSection,
  LanguagesSection,
  StatsSection,
  ImageSection,
  StackSection,
  SocialsSection,
  BadgesSection,
  Tech,
  Social,
  Badge,
} from "@/lib/types";

const sectionBuilders: {
  [K in Section["type"]]: (section: Extract<Section, { type: K }>) => string;
} = {
  text: (section: TextSection) =>
    `<${section.tag} align="${section.align}">${section.text}</${section.tag}>`,

  trophies: (section: TrophiesSection) => {
    const params = new URLSearchParams({
      username: section.username,
      theme: section.theme,
      title: section.title.join(","),
      rank: section.rank.join(","),
      column: section.column.toString(),
      row: section.row.toString(),
      "margin-w": section.marginW.toString(),
      "margin-h": section.marginH.toString(),
      "no-bg": (!section.bg).toString(),
      "no-frame": (!section.frame).toString(),
    });
    return `<div align="${section.align}"><img src="https://github-profile-trophy.vercel.app?${params}" height="150" alt="trophy graph"/></div>`;
  },

  activity: (section: ActivitySection) => {
    const params = new URLSearchParams({
      username: section.username,
      theme: section.theme,
      custom_title: section.custom_title,
      radius: section.radius.toString(),
      height: section.height.toString(),
      days: section.days.toString(),
      area: section.area.toString(),
      hide_border: section.hide_border.toString(),
      hide_title: section.hide_title.toString(),
      grid: section.grid.toString(),
    });
    return `<div align="${section.align}"><img src="https://github-readme-activity-graph.vercel.app/graph?${params}" alt="activity graph"/></div>`;
  },

  streak: (section: StreakSection) => {
    const params = new URLSearchParams({
      user: section.username,
      theme: section.theme,
      hide_border: section.hide_border.toString(),
      border_radius: section.border_radius.toString(),
      short_numbers: section.short_numbers.toString(),
      mode: section.mode,
      exclude_days: section.exclude_days.join(","),
      disable_animations: section.disable_animations.toString(),
      card_width: section.card_width.toString(),
      card_height: section.card_height.toString(),
      hide_total_contributions: section.hide_total_contributions.toString(),
      hide_current_streak: section.hide_current_streak.toString(),
      hide_longest_streak: section.hide_longest_streak.toString(),
    });
    return `<div align="${section.align}"><img src="https://streak-stats.demolab.com?${params}" alt="streak graph"/></div>`;
  },

  languages: (section: LanguagesSection) => {
    const params = new URLSearchParams({
      username: section.username,
      theme: section.theme,
      custom_title: section.custom_title,
      layout: section.layout,
      stats_format: section.stats_format,
      langs_count: section.langs_count.toString(),
      card_width: section.card_width.toString(),
      border_radius: section.border_radius.toString(),
      hide_title: section.hide_title.toString(),
      disable_animations: section.disable_animations.toString(),
      hide_progress: section.hide_progress.toString(),
      hide_border: section.hide_border.toString(),
    });
    return `<div align="${section.align}"><img src="https://github-readme-stats.vercel.app/api/top-langs?${params}" alt="languages graph"/></div>`;
  },

  stats: (section: StatsSection) => {
    const params = new URLSearchParams({
      username: section.username,
      theme: section.theme,
      rank_icon: section.rank_icon,
      number_format: section.number_format,
      show: section.show.join(","),
      custom_title: section.custom_title,
      border_radius: section.border_radius.toString(),
      card_width: section.card_width.toString(),
      hide_border: section.hide_border.toString(),
      hide_title: section.hide_title.toString(),
      hide_rank: section.hide_rank.toString(),
      show_icons: section.show_icons.toString(),
      include_all_commits: section.include_all_commits.toString(),
      disable_animations: section.disable_animations.toString(),
    });
    return `<div align="${section.align}"><img src="https://github-readme-stats.vercel.app/api?${params}" alt="stats graph"/></div>`;
  },

  image: (section: ImageSection) =>
    `<div align="${section.align}"><img src="${section.url}" height=${section.height} /></div>`,

  stack: (section: StackSection) => {
    const imgs = section.list
      .map(
        (tech: Tech) =>
          `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.name}/${tech.name}-${tech.selected}.svg" height="${section.size}" width="${section.size}" alt="${tech.name}" />`
      )
      .join("\n");
    return `<div align=${section.align}>\n${imgs}\n</div>`;
  },

  socials: (section: SocialsSection) => {
    const imgs = section.list
      .map(
        (social: Social) =>
          `<a href="${social.link}" target="_blank"><img src="https://raw.githubusercontent.com/rabiibouhestine/github-profile-maker/refs/heads/main/src/assets/social/${social.name}/default.svg" height="${section.size}" width="${section.size}" alt="${social.name}" /></a>`
      )
      .join("\n");
    return `<div align=${section.align}>\n${imgs}\n</div>`;
  },

  badges: (section: BadgesSection) => {
    const imgs = section.list
      .map(
        (badge: Badge) =>
          `<img src="https://img.shields.io/badge/${badge.label}-${badge.message}-${badge.color}" alt="badge" />`
      )
      .join("\n");
    return `<div align=${section.align}>\n${imgs}\n</div>`;
  },
};

export function buildSection(section: Section): string {
  switch (section.type) {
    case "text":
      return sectionBuilders.text(section);
    case "trophies":
      return sectionBuilders.trophies(section);
    case "activity":
      return sectionBuilders.activity(section);
    case "streak":
      return sectionBuilders.streak(section);
    case "languages":
      return sectionBuilders.languages(section);
    case "stats":
      return sectionBuilders.stats(section);
    case "image":
      return sectionBuilders.image(section);
    case "stack":
      return sectionBuilders.stack(section);
    case "socials":
      return sectionBuilders.socials(section);
    case "badges":
      return sectionBuilders.badges(section);
    default:
      return "";
  }
}

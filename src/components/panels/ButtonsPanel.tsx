import {
  Download as DownloadIcon,
  Clipboard as ClipboardCopyIcon,
} from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { saveAs } from "file-saver";
import type { Section } from "@/lib/types";
import { useMemo } from "react";

type ButtonsPanelProps = {
  sections: Section[];
};

export default function ButtonsPanel({ sections }: ButtonsPanelProps) {
  const sectionsHTML = useMemo(() => {
    return sections
      .map((section) => {
        if (section.type === "text") {
          return `<${section.tag} align="${section.align}" >${section.text}</${section.tag}>`;
        }
        if (section.type === "trophies") {
          const params = new URLSearchParams({
            username: section.username,
            theme: section.theme,
            title: section.title.join(","), // comma-separated
            rank: section.rank.join(","), // comma-separated
            column: section.column.toString(),
            row: section.row.toString(),
            "margin-w": section.marginW.toString(),
            "margin-h": section.marginH.toString(),
            "no-bg": (!section.bg).toString(),
            "no-frame": (!section.frame).toString(),
          });

          return `<div align="${
            section.align
          }"><img src="https://github-profile-trophy.vercel.app?${params.toString()}" height="150" alt="trophy graph"/></div>`;
        }
        if (section.type === "activity") {
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
          return `<div align="${
            section.align
          }"><img src="https://github-readme-activity-graph.vercel.app/graph?${params.toString()}" alt="activity graph"  /></div>`;
        }
        if (section.type === "streak") {
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
            hide_total_contributions:
              section.hide_total_contributions.toString(),
            hide_current_streak: section.hide_current_streak.toString(),
            hide_longest_streak: section.hide_longest_streak.toString(),
          });
          return `<div align="${
            section.align
          }"><img src="https://streak-stats.demolab.com?${params.toString()}" alt="streak graph"  /></div>`;
        }
        if (section.type === "languages") {
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
          return `<div align="${
            section.align
          }"><img src="https://github-readme-stats.vercel.app/api/top-langs?${params.toString()}" alt="languages graph"/></div>`;
        }
        if (section.type === "stats") {
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
          return `<div align="${
            section.align
          }"><img src="https://github-readme-stats.vercel.app/api?${params.toString()}" alt="stats graph"  /></div>`;
        }
        if (section.type === "image") {
          return `<div align="${section.align}"><img src="${section.url}" height=${section.height} /></div>`;
        }
        if (section.type === "stack") {
          const imgs = section.list
            .map(
              (tech) =>
                `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.name}/${tech.name}-${tech.selected}.svg" height="${section.size}" width="${section.size}" alt="${tech.name}" />`
            )
            .join("\n");
          return `<div align=${section.align}>\n${imgs}\n</div>`;
        }
        if (section.type === "socials") {
          const imgs = section.list
            .map(
              (social) =>
                `<a href="${social.name}" target="_blank"><img src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/${social.name}/default.svg" height="${section.size}" width="${section.size}" alt="${social.name}" /></a>`
            )
            .join("\n");
          return `<div align=${section.align}>\n${imgs}\n</div>`;
        }
        if (section.type === "badges") {
          const imgs = section.list
            .map(
              (badge) =>
                `<img src="https://img.shields.io/badge/${badge.label}-${badge.message}-${badge.color}" alt="badge" />`
            )
            .join("\n");
          return `<div align=${section.align}>\n${imgs}\n</div>`;
        }
        return "";
      })
      .join("<br>\n");
  }, [sections]);

  const handleCopy = () => {
    navigator.clipboard.writeText(sectionsHTML);
    alert("Copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([sectionsHTML], {
      type: "text/markdown;charset=utf-8",
    });
    saveAs(blob, "README.md");
  };

  return (
    <div className="panel flex flex-wrap gap-2 items-center justify-between mb-4 xl:mb-0">
      <div className="flex flex-wrap gap-2 items-center">
        <GithubIcon width={32} height={32} />
        <div className="flex flex-col">
          <h1 className="font-semibold text-sm">Github Profile Maker</h1>
          <span className="text-xs">
            Made by{" "}
            <a
              href="https://rabiibouhestine.com/"
              target="_blank"
              className="text-blue-800 dark:text-blue-300 hover:underline"
            >
              Rabii Bouhestine
            </a>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" onClick={handleCopy}>
          <ClipboardCopyIcon />
          Copy
        </Button>
        <Button variant="outline" onClick={handleDownload}>
          <DownloadIcon /> Download
        </Button>

        <Button asChild variant="outline">
          <a
            href="https://github.com/rabiibouhestine/github-profile-maker"
            target="_blank"
          >
            <GithubIcon />
          </a>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}

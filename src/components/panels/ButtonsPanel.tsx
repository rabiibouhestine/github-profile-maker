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
          return `<div align="${section.align}"><img src="https://github-profile-trophy.vercel.app?username=${section.username}&theme=dracula&column=-1&row=1&margin-w=8&margin-h=8&no-bg=false&no-frame=false" height="150" alt="trophy graph"  /></div>`;
        }
        if (section.type === "activity") {
          return `<div align="${section.align}"><img src="https://github-readme-activity-graph.vercel.app/graph?username=${section.username}&radius=16&theme=dracula&area=true" height="300" alt="activity-graph graph"  /></div>`;
        }
        if (section.type === "streak") {
          return `<div align="${section.align}"><img src="https://streak-stats.demolab.com?user=${section.username}&locale=en&mode=daily&theme=dracula&hide_border=false&border_radius=5" height="150" alt="streak graph"  /></div>`;
        }
        if (section.type === "image") {
          return `<div align="${section.align}"><img src="${section.url}" height=${section.height} /></div>`;
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
        <a
          href="https://github.com/rabiibouhestine/profile-maker"
          target="_blank"
        >
          <GithubIcon width={32} height={32} />
        </a>
        <div className="flex flex-col">
          <h1 className="font-semibold text-sm">Profile Maker</h1>
          <span className="text-xs">
            Made by{" "}
            <a href="https://rabiibouhestine.com/" target="_blank">
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
        <ModeToggle />
      </div>
    </div>
  );
}

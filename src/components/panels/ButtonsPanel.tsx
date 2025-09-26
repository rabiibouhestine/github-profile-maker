import {
  Download as DownloadIcon,
  Clipboard as ClipboardCopyIcon,
} from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { saveAs } from "file-saver";

type ButtonsPanelProps = {
  sectionsHTML: string;
};

export default function ButtonsPanel({ sectionsHTML }: ButtonsPanelProps) {
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

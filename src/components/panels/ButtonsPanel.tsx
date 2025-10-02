import {
  Download as DownloadIcon,
  Clipboard as ClipboardCopyIcon,
} from "lucide-react";
import { useSections } from "@/components/hooks/SectionsProvider";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { saveAs } from "file-saver";
import { useMemo } from "react";
import { buildSection } from "@/lib/section_builders";

export default function ButtonsPanel() {
  const { sections } = useSections();

  const sectionsHTML = useMemo(() => {
    return sections.map(buildSection).join("<br>\n");
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
        <img src="/GithubFav.svg" width={32} height={32} />
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}

import { ThemeProvider } from "./components/hooks/theme-provider";
import { ModeToggle } from "./components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import SectionCard from "./components/SectionCard";
import { saveAs } from "file-saver";
import {
  Settings as SettingsIcon,
  Download as DownloadIcon,
  Clipboard as ClipboardCopyIcon,
} from "lucide-react";
import GithubIcon from "./components/icons/GithubIcon";
import Editor from "./components/editors/Editor";
import { useState, useMemo } from "react";

import type { Section } from "./lib/types";

import AddSection from "@/components/AddSection";

const sectionsList: Section[] = [
  {
    id: 1,
    type: "text",
    tag: "h1",
    align: "center",
    text: "Hello World jhfgkjh jhf u jyf uufjh uyf j f uyfhkuyfjf",
  },
  {
    id: 2,
    type: "image",
    url: "https://myimage.com",
    align: "center",
    height: 200,
  },
  {
    id: 3,
    type: "text",
    tag: "h1",
    align: "center",
    text: "My Brain Hurts lcdkjhksfd. kagdhska adskg g sdk g kdgsk gs dkjgs dkfg",
  },
  {
    id: 4,
    type: "text",
    tag: "h1",
    align: "center",
    text: "Hakuna Matata kagdhska adskg g sdk g kdgsk gs dkjgs dkfg",
  },
];

function App() {
  const [sections, setSections] = useState<Section[]>(sectionsList);
  const [selectedSectionID, setSelectedSectionID] = useState(1);

  const sectionsHTML = useMemo(() => {
    return sections
      .map((section) => {
        if (section.type === "text") {
          return `<${section.tag} style="text-align:${section.align}">${section.text}</${section.tag}>`;
        }
        if (section.type === "image") {
          return `<img src="${section.url}" alt="" style="display:block; margin:0 auto; height:${section.height}px; text-align:${section.align}" />`;
        }
        return "";
      })
      .join("\n");
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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen max-w-[1440px] mx-auto p-4 grid grid-cols-4 gap-4">
        <div className="panel col-span-1 flex flex-col gap-2 overflow-y-auto">
          {sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              isSelected={section.id === selectedSectionID}
              onClick={() => setSelectedSectionID(section.id)}
            />
          ))}
          <AddSection
            sections={sections}
            setSections={setSections}
            setSelectedSectionID={setSelectedSectionID}
          />
        </div>
        <div className="panel col-span-1">
          <Editor
            sections={sections}
            setSections={setSections}
            selectedSectionID={selectedSectionID}
            setSelectedSectionID={setSelectedSectionID}
          />
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <div className="panel flex flex-wrap gap-2 items-center justify-between">
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
              <Button variant="outline">
                <SettingsIcon />
              </Button>
              <ModeToggle />
            </div>
          </div>
          <div className="panel h-full">
            <div dangerouslySetInnerHTML={{ __html: sectionsHTML }} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

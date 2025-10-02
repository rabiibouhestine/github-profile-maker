import { useState } from "react";
import type { Section } from "@/lib/types";
import { ThemeProvider } from "@/components/hooks/theme-provider";
import EditorPanel from "@/components/panels/EditorPanel";
import SectionsPanel from "@/components/panels/SectionsPanel";
import ButtonsPanel from "@/components/panels/ButtonsPanel";
import PreviewPanel from "@/components/panels/PreviewPanel";

const sectionsList: Section[] = [
  {
    id: 1,
    type: "text",
    tag: "h1",
    align: "center",
    text: "Hi there 👋",
  },
  {
    id: 2,
    type: "badges",
    align: "center",
    list: [
      {
        id: 1,
        label: "Linkedin",
        message: "rabiibouhestine",
        color: "blue",
      },
      {
        id: 2,
        label: "Email",
        message: "rabiibouhestine@gmail.com",
        color: "red",
      },
      {
        id: 3,
        label: "Website",
        message: "rabiibouhestine.com",
        color: "darkgreen",
      },
    ],
  },
  {
    id: 3,
    type: "text",
    tag: "p",
    align: "center",
    text: "I am a Software Engineer specialising in Frontend Development with 7+ years of experience in building web apps. I have had the opportunity of collaborating with diverse businesses, companies, and agencies worldwide since 2018.",
  },
  {
    id: 4,
    type: "stack",
    align: "center",
    size: 40,
    list: [
      {
        name: "javascript",
        selected: "original",
        versions: ["original", "plain"],
      },
      {
        name: "html5",
        selected: "original",
        versions: ["original", "plain"],
      },
      {
        name: "css3",
        selected: "original",
        versions: ["original", "plain"],
      },
      {
        name: "sass",
        selected: "original",
        versions: ["original", "plain"],
      },
      {
        name: "typescript",
        selected: "original",
        versions: ["original", "plain"],
      },
      {
        name: "nodejs",
        selected: "original",
        versions: ["original", "plain"],
      },
      {
        name: "vitejs",
        selected: "original",
        versions: ["original", "plain"],
      },
      {
        name: "react",
        selected: "original",
        versions: ["original", "plain"],
      },
      {
        name: "nextjs",
        selected: "original",
        versions: ["original", "plain"],
      },
      {
        name: "svelte",
        selected: "original",
        versions: ["original", "plain"],
      },
      {
        name: "docker",
        selected: "original",
        versions: ["original", "plain"],
      },
    ],
  },
  {
    id: 5,
    type: "trophies",
    username: "rabiibouhestine",
    align: "center",
    theme: "dracula",
    title: [
      "Commits",
      "Reviews",
      "Experience",
      "Issues",
      "PullRequest",
      "Stars",
      "Repositories",
      "Followers",
    ],
    rank: ["SECRET", "SSS", "SS", "S", "AAA", "AA", "A"],
    column: 5,
    row: 1,
    marginW: 8,
    marginH: 8,
    bg: true,
    frame: true,
  },
];

function App() {
  const [sections, setSections] = useState<Section[]>(sectionsList);
  const [selectedSectionID, setSelectedSectionID] = useState(1);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen max-w-[1440px] mx-auto p-4 grid grid-cols-1 xl:grid-cols-4 gap-4">
        <div className="panel col-span-1 flex flex-col gap-2 xl:overflow-y-auto">
          <SectionsPanel
            sections={sections}
            setSections={setSections}
            selectedSectionID={selectedSectionID}
            setSelectedSectionID={setSelectedSectionID}
          />
        </div>
        <div className="panel col-span-1 h-full xl:min-h-0 xl:overflow-y-auto">
          <EditorPanel
            sections={sections}
            setSections={setSections}
            selectedSectionID={selectedSectionID}
            setSelectedSectionID={setSelectedSectionID}
          />
        </div>
        <div className="col-span-1 xl:col-span-2 flex flex-col gap-4 h-full xl:min-h-0">
          <ButtonsPanel sections={sections} />
          <PreviewPanel sections={sections} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

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
    text: "Hello World jhfgkjh jhf u jyf uufjh uyf j f uyfhkuyfjf",
  },
  {
    id: 2,
    type: "image",
    url: "https://placehold.co/600x200",
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
        <div className="panel col-span-1">
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

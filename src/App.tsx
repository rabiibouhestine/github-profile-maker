import { useState, useMemo } from "react";
import type { Section } from "@/lib/types";
import { ThemeProvider } from "@/components/hooks/theme-provider";
import EditorPanel from "@/components/panels/EditorPanel";
import SectionsPanel from "@/components/panels/SectionsPanel";
import ButtonsPanel from "@/components/panels/ButtonsPanel";

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

  const sectionsHTML = useMemo(() => {
    return sections
      .map((section) => {
        if (section.type === "text") {
          return `<${section.tag} align="${section.align}" >${section.text}</${section.tag}>`;
        }
        if (section.type === "image") {
          return `<div align="${section.align}"><img src="${section.url}" height=${section.height} /></div>`;
        }
        return "";
      })
      .join("<br>\n");
  }, [sections]);

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
          <ButtonsPanel sectionsHTML={sectionsHTML} />
          <div
            className="panel flex-1 xl:min-h-0 xl:overflow-y-auto order-first xl:order-last"
            dangerouslySetInnerHTML={{ __html: sectionsHTML }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

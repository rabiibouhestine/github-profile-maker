import TextEditor from "../editors/TextEditor";
import ImageEditor from "../editors/ImageEditor";
import GithubEditor from "../editors/GithubEditor";

import type { Section } from "@/lib/types";

type EditorPanelProps = {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  selectedSectionID: number;
  setSelectedSectionID: React.Dispatch<React.SetStateAction<number>>;
};

export default function EditorPanel({
  sections,
  setSections,
  selectedSectionID,
  setSelectedSectionID,
}: EditorPanelProps) {
  const selectedSection = sections.find((s) => s.id === selectedSectionID);

  if (!selectedSection) return null;

  const editorMap: Record<string, React.ComponentType<EditorPanelProps>> = {
    text: TextEditor,
    image: ImageEditor,
    trophies: GithubEditor,
    activity: GithubEditor,
    streak: GithubEditor,
    languages: GithubEditor,
    stats: GithubEditor,
  };

  const EditorComponent = editorMap[selectedSection.type];

  if (!EditorComponent) return null;

  return (
    <EditorComponent
      sections={sections}
      setSections={setSections}
      selectedSectionID={selectedSectionID}
      setSelectedSectionID={setSelectedSectionID}
    />
  );
}

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
  switch (selectedSection?.type) {
    case "text":
      return (
        <TextEditor
          sections={sections}
          setSections={setSections}
          selectedSectionID={selectedSectionID}
          setSelectedSectionID={setSelectedSectionID}
        />
      );
    case "snake":
      return (
        <GithubEditor
          sections={sections}
          setSections={setSections}
          selectedSectionID={selectedSectionID}
          setSelectedSectionID={setSelectedSectionID}
        />
      );
    case "image":
      return (
        <ImageEditor
          sections={sections}
          setSections={setSections}
          selectedSectionID={selectedSectionID}
          setSelectedSectionID={setSelectedSectionID}
        />
      );
    default:
      break;
  }
}

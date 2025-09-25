import TextEditor from "./TextEditor";
import ImageEditor from "./ImageEditor";

import type { Section } from "@/lib/types";

type EditorProps = {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  selectedSectionID: number;
  setSelectedSectionID: React.Dispatch<React.SetStateAction<number>>;
};

export default function Editor({
  sections,
  setSections,
  selectedSectionID,
  setSelectedSectionID,
}: EditorProps) {
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

import SectionCard from "@/components/SectionCard";
import AddSection from "@/components/AddSection";

import type { Section } from "@/lib/types";

type SectionsPanelProps = {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  selectedSectionID: number;
  setSelectedSectionID: React.Dispatch<React.SetStateAction<number>>;
};

export default function SectionsPanel({
  sections,
  setSections,
  selectedSectionID,
  setSelectedSectionID,
}: SectionsPanelProps) {
  return (
    <>
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
    </>
  );
}

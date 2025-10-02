import { initialSections } from "@/resources/default_sections";
import { createContext, useContext, useState, useEffect } from "react";

import type { Section } from "@/lib/types";

type SectionsContextType = {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  selectedSectionID: number;
  setSelectedSectionID: React.Dispatch<React.SetStateAction<number>>;
};

const SectionsContext = createContext<SectionsContextType | undefined>(
  undefined
);

export function SectionsProvider({ children }: { children: React.ReactNode }) {
  // Load from localStorage on first render
  const [sections, setSections] = useState<Section[]>(() => {
    const saved = localStorage.getItem("sections");
    return saved ? JSON.parse(saved) : initialSections;
  });

  const [selectedSectionID, setSelectedSectionID] = useState<number>(() => {
    const saved = localStorage.getItem("selectedSectionID");
    return saved ? Number(saved) : initialSections[0].id;
  });

  // Save sections to localStorage whenever sections change
  useEffect(() => {
    localStorage.setItem("sections", JSON.stringify(sections));
  }, [sections]);

  // Save selectedSectionID to localStorage whenever selectedSectionID change
  useEffect(() => {
    localStorage.setItem("selectedSectionID", String(selectedSectionID));
  }, [selectedSectionID]);

  return (
    <SectionsContext.Provider
      value={{ sections, setSections, selectedSectionID, setSelectedSectionID }}
    >
      {children}
    </SectionsContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export function useSections() {
  const ctx = useContext(SectionsContext);
  if (!ctx) throw new Error("useSections must be used inside SectionsProvider");
  return ctx;
}

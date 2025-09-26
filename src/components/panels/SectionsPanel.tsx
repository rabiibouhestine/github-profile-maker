import SectionCard from "@/components/SectionCard";
import AddSection from "@/components/AddSection";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { motion, AnimatePresence } from "framer-motion";

import type { Section } from "@/lib/types";
import type { DragEndEvent } from "@dnd-kit/core";

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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((s) => s.id.toString() === active.id);
        const newIndex = items.findIndex((s) => s.id.toString() === over.id);

        if (oldIndex === -1 || newIndex === -1) return items;

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        onDragStart={({ active }) => {
          setSelectedSectionID(Number(active.id));
        }}
      >
        <SortableContext
          items={sections.map((s) => s.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          <AnimatePresence>
            {sections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <SectionCard
                  id={section.id.toString()}
                  key={section.id}
                  section={section}
                  isSelected={section.id === selectedSectionID}
                  onClick={() => setSelectedSectionID(section.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </SortableContext>
      </DndContext>
      <AddSection
        sections={sections}
        setSections={setSections}
        setSelectedSectionID={setSelectedSectionID}
      />
    </>
  );
}

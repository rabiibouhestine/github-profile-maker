import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { CirclePlus as CirclePlusIcon } from "lucide-react";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import BadgeCard from "@/components/BadgeCard";
import { useSections } from "@/components/hooks/SectionsProvider";

import type { AlignType, BadgesSection } from "@/lib/types";
import type { DragEndEvent } from "@dnd-kit/core";

export default function BadgesEditor() {
  const { sections, setSections, selectedSectionID } = useSections();

  const selectedSection = sections.find(
    (s): s is BadgesSection => s.id === selectedSectionID && s.type === "badges"
  );

  const align = selectedSection?.align ?? "center";
  const list = selectedSection?.list ?? [];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function onAlignChange(val: AlignType) {
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSectionID ? { ...s, align: val } : s))
    );
  }

  function handleAddBadge() {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== selectedSectionID) return s;
        if (s.type !== "badges") return s;
        return {
          ...s,
          list: [
            ...s.list,
            {
              id: Date.now(),
              label: "anything",
              message: "you like",
              color: "blue",
            },
          ],
        };
      })
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== selectedSectionID) return s;
        if (s.type !== "badges") return s;

        const oldIndex = s.list.findIndex((badge) => badge.id === active.id);
        const newIndex = s.list.findIndex((badge) => badge.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return s;

        return {
          ...s,
          list: arrayMove(s.list, oldIndex, newIndex),
        };
      })
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-3">
      <div className="flex flex-col gap-2">
        <Label>Align</Label>
        <Select value={align} onValueChange={onAlignChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="right">Right</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="left">Left</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Badges</Label>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={list.map((badge) => badge.id)}
            strategy={verticalListSortingStrategy}
          >
            <AnimatePresence>
              {list.map((badge) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <BadgeCard
                    id={badge.id}
                    label={badge.label}
                    message={badge.message}
                    color={badge.color}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </SortableContext>
        </DndContext>
      </div>
      <Button size="lg" onClick={handleAddBadge}>
        <CirclePlusIcon />
        Add Badge
      </Button>
    </div>
  );
}

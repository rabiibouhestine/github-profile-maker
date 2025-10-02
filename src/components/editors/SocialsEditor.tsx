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
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { motion, AnimatePresence } from "framer-motion";
import AddSocial from "@/components/AddSocial";
import SocialCard from "@/components/SocialCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSections } from "@/components/hooks/SectionsProvider";

import type { AlignType, SocialsSection } from "@/lib/types";
import type { DragEndEvent } from "@dnd-kit/core";

export default function SocialsEditor() {
  const { sections, setSections, selectedSectionID } = useSections();

  const selectedSection = sections.find(
    (s): s is SocialsSection => s.id === selectedSectionID
  );

  const align = selectedSection?.align || "center";
  const size = selectedSection?.size || 40;
  const list = selectedSection?.list || [];

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

  function onHeightChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value;
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID ? { ...s, size: Number(val) } : s
      )
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== selectedSectionID) return s;
        if (s.type !== "socials") return s;

        const oldIndex = s.list.findIndex((tech) => tech.name === active.id);
        const newIndex = s.list.findIndex((tech) => tech.name === over.id);

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
        <Label>Icon Size</Label>
        <Input
          type="number"
          placeholder="40"
          id="message"
          value={size}
          onChange={onHeightChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Socials</Label>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={list.map((s) => s.name.toString())}
            strategy={verticalListSortingStrategy}
          >
            <AnimatePresence>
              {list.map((social) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <SocialCard
                    key={social.name}
                    setSections={setSections}
                    selectedSectionID={selectedSectionID}
                    name={social.name}
                    link={social.link}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </SortableContext>
        </DndContext>
      </div>
      <AddSocial
        setSections={setSections}
        selectedSectionID={selectedSectionID}
      />
    </div>
  );
}

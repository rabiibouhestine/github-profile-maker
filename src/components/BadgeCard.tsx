import {
  Trash as TrashIcon,
  Grip as GripIcon,
  SquarePen as SquarePenIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { useSections } from "@/components/hooks/SectionsProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

import type { BadgesSection } from "@/lib/types";

type BadgeCardProps = {
  id: number;
  label: string;
  message: string;
  color: string;
};

export default function BadgeCard({
  id,
  label,
  message,
  color,
}: BadgeCardProps) {
  const { setSections, selectedSectionID } = useSections();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    label,
    message,
    color,
  });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== selectedSectionID) return section;
        if (section.type !== "badges") return section;

        return {
          ...section,
          list: section.list.filter((badge) => badge.id !== id),
        } as BadgesSection;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== selectedSectionID) return section;
        if (section.type !== "badges") return section;

        return {
          ...section,
          list: section.list.map((badge) =>
            badge.id === id ? { ...badge, ...formData } : badge
          ),
        } as BadgesSection;
      })
    );

    setIsModalOpen(false);
  };

  const resetForm = () => {
    setFormData({
      label,
      message,
      color,
    });
  };

  return (
    <div
      className="border rounded-sm p-2 flex items-center gap-4 min-h-16"
      ref={setNodeRef}
      style={style}
    >
      <GripIcon
        {...attributes}
        {...listeners}
        className="text-muted-foreground focus:outline-none hover:cursor-grab flex-shrink-0"
        strokeWidth={1.5}
      />
      <div className="grow h-6">
        <img
          src={`https://img.shields.io/badge/${label}-${message}-${color}`}
          className="h-full"
          alt="badge"
        />
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger>
          <SquarePenIcon
            className="text-muted-foreground hover:cursor-pointer hover:text-primary"
            strokeWidth={1.5}
          />
        </DialogTrigger>
        <DialogContent className="!max-h-screen overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="mb-6">
              <DialogTitle>Add a badge</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  name="label"
                  placeholder="anything"
                  value={formData.label}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="message">Message</Label>
                <Input
                  id="message"
                  name="message"
                  placeholder="you like"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="color" className="flex flex-col items-start">
                  Color
                  <span className="text-muted-foreground leading-6">
                    Hex, rgb, rgba, hsl, hsla and css named colors may be used.
                  </span>
                </Label>
                <Input
                  id="color"
                  name="color"
                  placeholder="color"
                  value={formData.color}
                  onChange={handleChange}
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <TrashIcon
        className="text-muted-foreground hover:cursor-pointer hover:text-destructive flex-shrink-0"
        strokeWidth={1.5}
        onClick={handleDelete}
      />
    </div>
  );
}

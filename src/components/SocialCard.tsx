import { Trash as TrashIcon, Grip as GripIcon } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { useSections } from "@/components/hooks/SectionsProvider";

import type { SocialsSection } from "@/lib/types";

type SocialCardProps = {
  name: string;
  link: string;
};

export default function SocialCard({ name, link }: SocialCardProps) {
  const { setSections, selectedSectionID } = useSections();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = () => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== selectedSectionID) return section;
        if (section.type !== "socials") return section;

        return {
          ...section,
          list: section.list.filter((social) => social.name !== name),
        } as SocialsSection;
      })
    );
  };

  function onLinkChange(
    event: React.ChangeEvent<HTMLInputElement>,
    socialName: string
  ) {
    const val = event.target.value;

    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSectionID && s.type === "socials"
          ? {
              ...s,
              list: s.list.map((item) =>
                item.name === socialName ? { ...item, link: val } : item
              ),
            }
          : s
      )
    );
  }

  return (
    <div
      className="border rounded-sm p-2 flex items-center gap-4 min-h-16"
      ref={setNodeRef}
      style={style}
    >
      <GripIcon
        {...attributes}
        {...listeners}
        className="text-muted-foreground focus:outline-none hover:cursor-grab"
        strokeWidth={1.5}
      />
      <div className="flex gap-2 items-center">
        <img
          src={`https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/${name}/default.svg`}
          height={32}
          width={32}
        />
        <Input
          id={name}
          type="text"
          placeholder="https://"
          value={link}
          onChange={(e) => onLinkChange(e, name)}
        />
      </div>
      <TrashIcon
        className="text-muted-foreground hover:cursor-pointer hover:text-destructive"
        strokeWidth={1.5}
        onClick={handleDelete}
      />
    </div>
  );
}

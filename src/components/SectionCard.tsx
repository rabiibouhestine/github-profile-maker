import {
  Grip as GripIcon,
  SquarePen as SquarePenIcon,
  Type as TextIcon,
  Image as ImageIcon,
  SquareDashed as SquareDashedIcon,
} from "lucide-react";

type SectionCardProps = {
  type?: string;
  text?: string;
};

export default function SectionCard({ type, text }: SectionCardProps) {
  function getIcon(type?: string) {
    switch (type) {
      case "text":
        return <TextIcon />;
        break;
      case "image":
        return <ImageIcon />;
        break;
      default:
        return <SquareDashedIcon />;
    }
  }
  return (
    <div className="border rounded-sm p-2 flex items-center gap-4 h-16">
      <GripIcon className="text-muted-foreground" strokeWidth={1.5} />
      <div className="flex gap-2 items-center">
        {getIcon(type)}
        <div className="flex flex-col">
          <span className="font-semibold capitalize">{type}</span>
          {text && <span className="text-xs truncate w-40">{text}</span>}
        </div>
      </div>
      <SquarePenIcon
        className="text-muted-foreground ml-auto"
        strokeWidth={1.5}
      />
    </div>
  );
}

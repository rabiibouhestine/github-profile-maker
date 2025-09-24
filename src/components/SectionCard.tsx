import {
  Grip as GripIcon,
  ChartPie as ChartPieIcon,
  SquarePen as SquarePenIcon,
} from "lucide-react";

export default function SectionCard() {
  return (
    <div className="border rounded-sm p-2 flex items-center gap-4">
      <GripIcon className="text-muted-foreground" strokeWidth={1.5} />
      <div className="flex gap-2 items-center">
        <ChartPieIcon />
        <div className="flex flex-col">
          <span className="font-semibold">Text</span>
          <span className="text-xs">I am a softw...</span>
        </div>
      </div>
      <SquarePenIcon
        className="text-muted-foreground ml-auto"
        strokeWidth={1.5}
      />
    </div>
  );
}

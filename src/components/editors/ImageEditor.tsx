import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash as TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

import type { AlignType } from "@/lib/types";

type ImageEditorProps = {
  url: string;
  onUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  align: AlignType;
  onAlignChange: (value: AlignType) => void;
  height: number;
  onHeightChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ImageEditor({
  url,
  onUrlChange,
  align,
  onAlignChange,
  height,
  onHeightChange,
}: ImageEditorProps) {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Image URL</Label>
        <Input
          type="text"
          placeholder="https://image.com"
          value={url}
          onChange={onUrlChange}
        />
      </div>
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
        <Label>Height</Label>
        <Input
          type="number"
          placeholder="200"
          value={height}
          onChange={onHeightChange}
        />
      </div>
      <Button variant="destructive">
        <TrashIcon />
        Delete Section
      </Button>
    </div>
  );
}

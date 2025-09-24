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

export default function ImageEditor() {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Image URL</Label>
        <Input type="text" placeholder="https://image.com" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Align</Label>
        <Select value={"center"}>
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
        <Input type="number" placeholder="200" />
      </div>
      <Button variant="destructive">
        <TrashIcon />
        Delete Section
      </Button>
    </div>
  );
}

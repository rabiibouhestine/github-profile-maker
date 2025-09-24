import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash as TrashIcon } from "lucide-react";

export default function TextEditor() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Tag</Label>
        <Select value={"h1"}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="h1">H1</SelectItem>
            <SelectItem value="h2">H2</SelectItem>
            <SelectItem value="h3">H3</SelectItem>
            <SelectItem value="h4">H4</SelectItem>
            <SelectItem value="h5">H5</SelectItem>
            <SelectItem value="h6">H6</SelectItem>
            <SelectItem value="p">P</SelectItem>
          </SelectContent>
        </Select>
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
        <Label>Text</Label>
        <Textarea placeholder="Type your message here." id="message" />
      </div>
      <Button variant="destructive">
        <TrashIcon />
        Delete Section
      </Button>
    </div>
  );
}

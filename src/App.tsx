import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import SectionCard from "./components/SectionCard";
import {
  Settings as SettingsIcon,
  Download as DownloadIcon,
  Clipboard as ClipboardCopyIcon,
  CirclePlus as CirclePlusIcon,
} from "lucide-react";
import GithubIcon from "./components/icons/GithubIcon";
import TextEditor from "./components/editors/TextEditor";
import ImageEditor from "./components/editors/ImageEditor";

const sectionsList = [
  {
    id: 1,
    type: "text",
    tag: "h1",
    align: "center",
    text: "Hello World jhfgkjh jhf u jyf uufjh uyf j f uyfhkuyfjf",
  },
  {
    id: 2,
    type: "image",
    url: "https://myimage.com",
    align: "center",
    height: 200,
  },
  {
    id: 3,
    type: "text",
    tag: "h1",
    align: "center",
    text: "My Brain Hurts lcdkjhksfd. kagdhska adskg g sdk g kdgsk gs dkjgs dkfg",
  },
];

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen max-w-[1440px] mx-auto p-4 grid grid-cols-4 gap-4">
        <div className="panel col-span-1 flex flex-col gap-2 overflow-y-auto">
          {sectionsList.map((section) => (
            <SectionCard type={section.type} text={section.text} />
          ))}
          <Button size={"lg"}>
            <CirclePlusIcon />
            Add Section
          </Button>
        </div>
        <div className="panel col-span-1">
          <TextEditor />
          {/* <ImageEditor /> */}
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <div className="panel flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2 items-center">
              <a
                href="https://github.com/rabiibouhestine/profile-maker"
                target="_blank"
              >
                <GithubIcon width={32} height={32} />
              </a>
              <div className="flex flex-col">
                <h1 className="font-semibold text-sm">Profile Maker</h1>
                <span className="text-xs">
                  Made by{" "}
                  <a href="https://rabiibouhestine.com/" target="_blank">
                    Rabii Bouhestine
                  </a>
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline">
                <ClipboardCopyIcon />
                Copy
              </Button>
              <Button variant="outline">
                <DownloadIcon /> Download
              </Button>
              <Button variant="outline">
                <SettingsIcon />
              </Button>
              <ModeToggle />
            </div>
          </div>
          <div className="panel h-full"></div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

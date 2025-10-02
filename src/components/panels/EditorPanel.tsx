import TextEditor from "../editors/TextEditor";
import ImageEditor from "../editors/ImageEditor";
import StackEditor from "../editors/StackEditor";
import SocialsEditor from "../editors/SocialsEditor";
import BadgesEditor from "../editors/BadgesEditor";
import TrophiesEditor from "../editors/TrophiesEditor";
import ActivityEditor from "../editors/ActivityEditor";
import StreakEditor from "../editors/StreakEditor";
import LanguagesEditor from "../editors/LanguagesEditor";
import StatsEditor from "../editors/StatsEditor";
import { useSections } from "@/components/hooks/SectionsProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function EditorPanel() {
  const { sections, selectedSectionID } = useSections();

  const selectedSection = sections.find((s) => s.id === selectedSectionID);

  if (!selectedSection) return null;

  const editorMap: Record<string, React.ComponentType> = {
    text: TextEditor,
    image: ImageEditor,
    trophies: TrophiesEditor,
    activity: ActivityEditor,
    streak: StreakEditor,
    languages: LanguagesEditor,
    stats: StatsEditor,
    stack: StackEditor,
    socials: SocialsEditor,
    badges: BadgesEditor,
  };

  const EditorComponent = editorMap[selectedSection.type];

  if (!EditorComponent) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedSection.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.1 }}
        className="h-full"
      >
        <EditorComponent />
      </motion.div>
    </AnimatePresence>
  );
}

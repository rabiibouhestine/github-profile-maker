import { motion, AnimatePresence } from "framer-motion";
import type { Section } from "@/lib/types";

type PreviePanelProps = {
  sections: Section[];
};

export default function PreviewPanel({ sections }: PreviePanelProps) {
  return (
    <AnimatePresence>
      <div className="panel flex-1 xl:min-h-0 xl:overflow-y-auto order-first xl:order-last">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            layout // animates position changes
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {section.type === "text" ? (
              <section.tag style={{ textAlign: section.align }}>
                {section.text}
              </section.tag>
            ) : section.type === "image" ? (
              <img
                src={section.url}
                height={section.height}
                style={{ display: "block", margin: "auto" }}
              />
            ) : null}
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}

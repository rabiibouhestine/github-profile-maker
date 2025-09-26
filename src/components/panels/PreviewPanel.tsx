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
            ) : section.type === "trophies" ? (
              <div className={`text-${section.align}`}>
                <img
                  src={
                    "https://github-profile-trophy.vercel.app?username=" +
                    section.username +
                    "&theme=dracula&column=-1&row=1&margin-w=8&margin-h=8&no-bg=false&no-frame=false"
                  }
                  height="150"
                  alt="trophy graph"
                />
              </div>
            ) : section.type === "activity" ? (
              <div className={`text-${section.align}`}>
                <img
                  src={
                    "https://github-readme-activity-graph.vercel.app/graph?username=" +
                    section.username +
                    "&radius=16&theme=dracula&area=true"
                  }
                  height="300"
                  alt="activity-graph graph"
                />
              </div>
            ) : section.type === "streak" ? (
              <div className={`text-${section.align}`}>
                <img
                  src={
                    "https://streak-stats.demolab.com?user=" +
                    section.username +
                    "&locale=en&mode=daily&theme=dracula&hide_border=false&border_radius=5"
                  }
                  height="150"
                  alt="streak graph"
                />
              </div>
            ) : section.type === "languages" ? (
              <div className={`text-${section.align}`}>
                <img
                  src={
                    "https://github-readme-stats.vercel.app/api/top-langs?username=" +
                    section.username +
                    "&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=5&theme=dracula&hide_border=false"
                  }
                  height="150"
                  alt="languages graph"
                />
              </div>
            ) : null}
            <br></br>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}

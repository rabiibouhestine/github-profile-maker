import { motion, AnimatePresence } from "framer-motion";
import type { Section } from "@/lib/types";

type PreviePanelProps = {
  sections: Section[];
};

export default function PreviewPanel({ sections }: PreviePanelProps) {
  const justifyMap: Record<"left" | "center" | "right", string> = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };
  const alignMap: Record<"left" | "center" | "right", string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
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
              <section.tag className={alignMap[section.align]}>
                {section.text}
              </section.tag>
            ) : section.type === "image" ? (
              <div className={`flex ${justifyMap[section.align]}`}>
                <img src={section.url} height={section.height} />
              </div>
            ) : section.type === "trophies" ? (
              <div className={`flex ${justifyMap[section.align]}`}>
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
              <div className={`flex ${justifyMap[section.align]}`}>
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
              <div className={`flex ${justifyMap[section.align]}`}>
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
              <div className={`flex ${justifyMap[section.align]}`}>
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
            ) : section.type === "stats" ? (
              <div className={`flex ${justifyMap[section.align]}`}>
                <img
                  src={
                    "https://github-readme-stats.vercel.app/api?username=" +
                    section.username +
                    "&hide_title=false&hide_rank=false&show_icons=true&include_all_commits=true&count_private=true&disable_animations=false&theme=dracula&locale=en&hide_border=false"
                  }
                  height="150"
                  alt="stats graph"
                />
              </div>
            ) : section.type === "stack" ? (
              <div
                className={`flex flex-wrap ${justifyMap[section.align]} gap-3`}
              >
                {section.list.map((tech) => (
                  <img
                    src={
                      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/" +
                      tech.name +
                      "/" +
                      tech.name +
                      "-" +
                      tech.selected +
                      ".svg"
                    }
                    height={section.size}
                    width={section.size}
                    alt={tech.name}
                  />
                ))}
              </div>
            ) : section.type === "socials" ? (
              <div
                className={`flex flex-wrap ${justifyMap[section.align]} gap-3`}
              >
                {section.list.map((social) => (
                  <a href={social.link} target="_blank">
                    <img
                      src={`https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/${social.name}/default.svg`}
                      height={section.size}
                      width={section.size}
                      alt={social.name}
                    />
                  </a>
                ))}
              </div>
            ) : section.type === "badges" ? (
              <div
                className={`flex flex-wrap ${justifyMap[section.align]} gap-3`}
              >
                {section.list.map((badge) => (
                  <img
                    src={`https://img.shields.io/badge/${badge.label}-${badge.message}-${badge.color}`}
                    alt="badge"
                  />
                ))}
              </div>
            ) : null}
            <br></br>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}

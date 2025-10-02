import { ThemeProvider } from "@/components/hooks/ThemeProvider";
import { SectionsProvider } from "@/components/hooks/SectionsProvider";
import EditorPanel from "@/components/panels/EditorPanel";
import SectionsPanel from "@/components/panels/SectionsPanel";
import ButtonsPanel from "@/components/panels/ButtonsPanel";
import PreviewPanel from "@/components/panels/PreviewPanel";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SectionsProvider>
        <div className="h-screen max-w-[1440px] mx-auto p-4 grid grid-cols-1 xl:grid-cols-4 gap-4">
          <div className="panel col-span-1 flex flex-col gap-2 xl:overflow-y-auto">
            <SectionsPanel />
          </div>
          <div className="panel col-span-1 h-full xl:min-h-0 xl:overflow-y-auto">
            <EditorPanel />
          </div>
          <div className="col-span-1 xl:col-span-2 flex flex-col gap-4 h-full xl:min-h-0">
            <ButtonsPanel />
            <PreviewPanel />
          </div>
        </div>
      </SectionsProvider>
    </ThemeProvider>
  );
}

export default App;

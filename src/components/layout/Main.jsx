import { useState, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import EditorContainer from "./EditorContainer";
import { InputContainer } from "./InputContainer";
import { OutputContainer } from "./OutputContainer";

export const Main = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = (e) => setIsLargeScreen(e.matches);
    setIsLargeScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  const mainDirection = isLargeScreen ? "horizontal" : "vertical";
  const innerDirection = isLargeScreen ? "vertical" : "horizontal";

  return (
    <div className="flex-1 flex flex-col bg-primary">
      <ResizablePanelGroup
        direction={mainDirection}
        className="flex-1 border-none"
      >
        <ResizablePanel defaultSize={70} minSize={30} maxSize={70}>
          <div className="flex flex-col h-full items-center justify-center">
            <EditorContainer />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle={true} className="bg-transparent" />
        <ResizablePanel defaultSize={30} minSize={30} maxSize={70}>
          <ResizablePanelGroup direction={innerDirection}>
            <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
              <div className="flex h-full items-center justify-center">
                <InputContainer />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle={true} className="bg-transparent" />
            <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
              <div className="flex h-full items-center justify-center">
                <OutputContainer />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

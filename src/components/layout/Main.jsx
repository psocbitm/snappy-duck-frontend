import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import EditorContainer from "./EditorContainer";
import { InputContainer } from "./InputContainer";
import { OutputContainer } from "./OutputContainer";
export const Main = () => {
  return (
    <div className="flex-1 flex flex-col bg-primary">
      {/* > md screen */}
      <div className="hidden flex-1 md:flex flex-col">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-auto flex-1 border-none"
        >
          <ResizablePanel defaultSize={70} minSize={30} maxSize={70}>
            <div className="flex flex-col h-full items-center justify-center">
              <EditorContainer />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle={true} className="bg-transparent" />
          <ResizablePanel>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel>
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
      {/* < md screen */}
      <div className="md:hidden flex-1 flex flex-col">
        <ResizablePanelGroup
          direction="vertical"
          className="h-auto flex-1 border-none"
        >
          <ResizablePanel defaultSize={70} minSize={30} maxSize={70}>
            <div className="flex flex-col h-full items-center justify-center">
              <EditorContainer />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle={true} className="bg-transparent" />
          <ResizablePanel>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel>
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
    </div>
  );
};

import { Editor } from "@monaco-editor/react";
import { LoaderCircleIcon } from "lucide-react";
import { Spinner } from "./Spinner";

export default function EditorContainer() {
  return (
    <div className="w-full h-full p-1 bg-primary">
      <div className="w-full h-full bg-[#1e1e1e] pl-4 rounded-md p-2">
        <Editor
          language="cpp"
          height="100%"
          options={{
            wordWrap: "on",
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 1,
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            formatOnPaste: true,
            tabSize: 2,
            insertSpaces: true,
            autoIndent: "full",
            overviewRulerBorder: false,
            roundedSelection: false,
            cursorStyle: "line",
            cursorSmoothCaretAnimation: "on",
            cursorSmoothScrolling: "on",
            renderLineHighlight: "none",
          }}
          theme="vs-dark"
          defaultValue="// Write your code here"
          loading={<Spinner />}
        />
      </div>
    </div>
  );
}

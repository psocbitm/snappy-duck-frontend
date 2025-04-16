import { Editor } from "@monaco-editor/react";
import { Spinner } from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { setCode } from "../../redux/slices/codeSlice";

const customTheme = {
  base: "vs-dark",
  inherit: true,
  rules: [],
  colors: {
    focusBorder: "#1e1e1e",
  },
};

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { code, language } = useSelector((state) => state.code);

  const handleEditorChange = (value) => {
    dispatch(setCode(value));
  };

  const beforeMount = (monaco) => {
    monaco.editor.defineTheme("customTheme", customTheme);
  };

  const editorOptions = {
    wordWrap: "on",
    minimap: { enabled: false },
    showUnused: false,
    folding: true,
    lineNumbersMinChars: 1,
    fontSize: 16,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    formatOnPaste: true,
    formatOnType: true,
    tabSize: 2,
    insertSpaces: true,
    autoIndent: "full",
    overviewRulerBorder: false,
    roundedSelection: false,
    cursorStyle: "line",
    cursorSmoothCaretAnimation: "on",
    cursorSmoothScrolling: "on",
    renderLineHighlight: "none",
  };

  return (
    <div className="w-full h-full p-2 md:pr-1 bg-primary">
      <div className="w-full h-full bg-[#1e1e1e] pl-4 rounded-md p-2">
        <Editor
          language={language}
          height="100%"
          options={editorOptions}
          theme="customTheme"
          defaultValue={code}
          loading={<Spinner />}
          onChange={handleEditorChange}
          beforeMount={beforeMount}
        />
      </div>
    </div>
  );
};

export default EditorContainer;

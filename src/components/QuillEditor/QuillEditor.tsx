import "./style.css";
import Quill from "quill";
import Delta from "quill-delta";
import { useEffect, useState } from "react";
import type { RangeStatic } from "quill";

type QuillEditorProps = {
  initialValue: Delta;
  onTextChange: (Delta: Delta) => void;
  onSelectionChange: (range: RangeStatic, oldRange: RangeStatic) => void;
};

// TODO: override quills internal value updating? make this comp more like textarea, pass value and onChange and use onChange to update a state to pass to the value
const QuillEditor = ({
  initialValue,
  onTextChange,
  onSelectionChange,
}: QuillEditorProps) => {
  const [quillEditor, setQuillEditor] = useState<Quill | undefined>(undefined);

  const onTextChangeInternal = () => {
    const contentDelta = quillEditor?.getContents() ?? new Delta();
    onTextChange(contentDelta);
  };

  useEffect(() => {
    const quillContainer = new Quill("#quill-editor", {
      debug: import.meta.env.DEV ? "info" : undefined,
      placeholder: "No content",
    });

    setQuillEditor(quillContainer);
  }, []);

  useEffect(() => {
    quillEditor?.setContents(initialValue);
  }, [quillEditor, initialValue]);

  useEffect(() => {
    quillEditor?.on("selection-change", onSelectionChange); // https://github.com/quilljs/quill/issues/1680
    quillEditor?.on("text-change", onTextChangeInternal);

    return () => {
      quillEditor?.off("selection-change", onSelectionChange);
      quillEditor?.off("text-change", onTextChangeInternal);
    };
  }, [quillEditor, onTextChangeInternal]);

  return <div id="quill-editor" className="h-fit"></div>;
};

export default QuillEditor;

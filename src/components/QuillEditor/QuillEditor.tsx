import "./style.css";
import { useEffect, useState } from "react";
import Quill, { RangeStatic } from "quill";
import Delta from "quill-delta";

type QuillEditorProps = {
  initialValue: Delta;
  onTextChange: (Delta: Delta) => void;
  onSelectionChange: (range: RangeStatic, oldRange: RangeStatic) => void;
};

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
    // const debug = import.meta.env.DEV ? "info" : undefined;
    const debug = undefined;
    const quillContainer = new Quill("#quill-editor", {
      debug,
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

  // TODO: there is a particular way to make the quill editor scrollable https://quilljs.com/playground/#autogrow-height
  return <div id="quill-editor" className="h-fit"></div>;
};

export default QuillEditor;

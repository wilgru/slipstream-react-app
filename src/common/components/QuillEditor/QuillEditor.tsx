import "./style.css";
import Quill from "quill";
import Delta from "quill-delta";
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { RangeStatic } from "quill";

type QuillEditorProps = {
  toolbarId: string;
  initialValue: Delta;
  onTextChange: (delta: Delta) => void;
  onSelectionChange: (range: RangeStatic, oldRange: RangeStatic) => void;
};

// TODO: override quills internal value updating? make this comp more like textarea, pass value and onChange and use onChange to update a state to pass to the value
const QuillEditor = forwardRef(
  ({
    toolbarId,
    initialValue,
    onTextChange,
    onSelectionChange,
  }: QuillEditorProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    const [quillEditor, setQuillEditor] = useState<Quill | null>();

    const onTextChangeInternal = (delta: Delta) => {
      const contentDelta = delta ?? new Delta();

      onTextChange(contentDelta);
    };

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChangeInternal;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      quillEditor?.setContents(initialValue);
    }, [initialValue, quillEditor]);

    useEffect(() => {
      quillEditor?.on("text-change", () => {
        onTextChangeRef.current?.(quillEditor?.getContents());
      });

      quillEditor?.on(
        "selection-change",
        (range: RangeStatic, oldRange: RangeStatic) => {
          onSelectionChangeRef.current?.(range, oldRange);
        }
      );

      return () => {
        quillEditor?.off("text-change", () => {
          onTextChangeRef.current?.(quillEditor?.getContents());
        });

        quillEditor?.off(
          "selection-change",
          (range: RangeStatic, oldRange: RangeStatic) => {
            onSelectionChangeRef.current?.(range, oldRange);
          }
        );
      };
    }, [quillEditor]);

    useEffect(() => {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div")
      );

      const quill = new Quill(editorContainer, {
        // debug: import.meta.env.DEV ? "info" : undefined, // TODO: add back in with dev tools
        placeholder: "No content",
        modules: {
          toolbar: {
            container: `#${toolbarId}`,
            handlers: {
              bold: function () {
                const selection = quill.getSelection();

                if (!selection) {
                  return;
                }

                const selectionFormatting = quill.getFormat(
                  selection.index,
                  selection.length
                );

                quill.format("bold", selectionFormatting.bold ? false : true);
              },
            },
          },
        },
        formats: ["bold", "italic", "underline", "strike"],
      });

      setQuillEditor(quill);

      // if (initialValueRef.current) {
      //   quill.setContents(initialValueRef.current);
      // }

      // quill.on("text-change", () => {
      //   onTextChangeRef.current?.(quill.getContents());
      // });

      // quill.on(
      //   "selection-change",
      //   (range: RangeStatic, oldRange: RangeStatic) => {
      //     onSelectionChangeRef.current?.(range, oldRange);
      //   }
      // );

      return () => {
        container.innerHTML = "";

        setQuillEditor(null);
      };
    }, []);

    return (
      <div
        id="quill-editor"
        ref={containerRef}
        className="h-fit text-stone-700 placeholder-stone-500"
      ></div>
    );
  }
);

export { QuillEditor };

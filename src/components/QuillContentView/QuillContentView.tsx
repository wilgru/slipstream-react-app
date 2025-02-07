import "./style.css";
import Quill from "quill";
import { useEffect, useRef } from "react";
import type Delta from "quill-delta";

type QuillContentVIewProps = {
  content: Delta;
};

export default function QuillContentView({ content }: QuillContentVIewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const quillEditor = new Quill(editorContainer, {
      readOnly: true,
    });

    quillEditor?.setContents(content);

    return () => {
      container.innerHTML = "";
    };
  }, [content]);

  return (
    <div
      id="quill-editor"
      ref={containerRef}
      className="h-fit text-black placeholder-stone-500"
    ></div>
  );
}

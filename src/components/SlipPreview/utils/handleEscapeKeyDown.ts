export const handleEscapeKeyDown = (e: KeyboardEvent) => {
  // .blur() only exists on HTMLElement, document.activeElement could potentially be an Element
  // https://github.com/Microsoft/TypeScript/issues/5901
  if (e.key === "Escape" && document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

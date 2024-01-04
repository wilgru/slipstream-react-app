import { Button } from "../Button/Button";

type ModalProps = {
  hidden: boolean;
  title: string;
  closeButton: string;
  saveButton: string;
  children?: JSX.Element;
};

export const Modal = ({
  hidden,
  title,
  closeButton,
  saveButton,
  children,
}: ModalProps) => {
  return (
    <div
      className={`${
        hidden ? "hidden" : ""
      } fixed flex justify-center items-center top-0 right-0 left-0 z-50 bg-stone-700 bg-opacity-75 w-full h-full`}
    >
      <div className="relative flex flex-col p-3 gap-3 w-96 bg-stone-100 border border-stone-700">
        {/* Modal header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-stone-700 font-medium">{title}</h1>
        </div>

        {/* Modal body */}
        <div>{children}</div>

        {/* Modal footer */}
        <div className="flex gap-3 items-center justify-start">
          <Button>{saveButton}</Button>
          <Button styleType="block-outline">{closeButton}</Button>
        </div>
      </div>
    </div>
  );
};

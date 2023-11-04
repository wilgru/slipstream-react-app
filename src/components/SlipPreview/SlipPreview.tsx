import { useState } from "react";
import { Slip } from "../../types/Slip.type";

type SlipPreviewProps = {
  slip: Slip;
};

const SlipPreview = ({ slip }: SlipPreviewProps) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <div
        className={
          "flex-grow w-full p-2 bg-white border border-gray-200 rounded-md shadow"
        }
      >
        <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900 select-none">
          {slip.title}
        </h1>
        <p className="text-gray-600">{slip.content}</p>
      </div>
    </>
  );
};

export default SlipPreview;

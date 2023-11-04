import { useState } from "react";
import { Slip } from "../../types/Slip.type";

type SlipPreviewProps = {
  slip: Slip | null;
};

const SlipPreview = ({ slip }: SlipPreviewProps) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <div
        className={
          "flex-grow w-full bg-white border border-gray-200 rounded-md shadow"
        }
      ></div>
    </>
  );
};

export default SlipPreview;

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "src/authentication/hooks/useUser";
import SlipCard from "src/slips/components/SlipCard/SlipCard";
import { usePurgeEmptySlips } from "src/slips/hooks/useDeleteEmptySlips";
import { useGetSlips } from "src/slips/hooks/useGetSlips";
import { handleArrowLeftKeyDown } from "src/stream/pages/utils/handleArrowLeftKeyDown";
import { handleArrowRightKeyDown } from "src/stream/pages/utils/handleArrowRightKeyDown";
import { handleSpaceBarKeyDown } from "src/stream/pages/utils/handleSpaceBarKeyDown";

export default function StreamPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { slips } = useGetSlips();
  const { purgeEmptySlips } = usePurgeEmptySlips();

  const [searchParams, setSearchParams] = useSearchParams();
  const [focusedSlipId, setFocusedSlipId] = useState<string | null>(null); //? redundant state?

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          handleArrowLeftKeyDown(
            setFocusedSlipId,
            searchParams,
            setSearchParams,
            slips
          );
          break;

        case "ArrowRight":
          e.preventDefault();
          handleArrowRightKeyDown(
            setFocusedSlipId,
            searchParams,
            setSearchParams,
            slips
          );
          break;

        case " ": // Spacebar key
          handleSpaceBarKeyDown(
            searchParams,
            setSearchParams,
            purgeEmptySlips,
            focusedSlipId
          );
          break;

        case "Escape":
          searchParams.delete("openSlip");
          setSearchParams(searchParams);

          setFocusedSlipId(null);
          purgeEmptySlips();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [focusedSlipId, slips, setSearchParams, searchParams, purgeEmptySlips]);

  useEffect(() => {
    !user && navigate("/login");
  }, [user, navigate]);

  return (
    <div className="flex flex-col h-full gap-2 p-6 w-full overflow-y-auto overflow-x-hidden">
      <div className="flex justify-center">
        <h1 className="font-title text-lg">{slips.length} Slips</h1>
      </div>

      {slips.map((slip) => (
        <SlipCard
          key={slip.id}
          slip={slip}
          isFocused={focusedSlipId ? slip.id === focusedSlipId : false}
        />
      ))}
    </div>
  );
}

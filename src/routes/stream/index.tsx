import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useGetSlips } from "src/models/slip/hooks/useGetSlips";
import { useUser } from "src/models/user/hooks/useUser";
import SlipCard from "src/routes/stream/-components/SlipCard";

export const Route = createFileRoute("/stream/")({
  component: StreamIndexComponent,
});

function StreamIndexComponent() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { slips } = useGetSlips();

  useEffect(() => {
    !user && navigate({ to: "/login" });
  }, [user, navigate]);

  return (
    <div className="flex flex-col h-full gap-2 p-6 w-full overflow-y-auto overflow-x-hidden">
      <div className="flex justify-center">
        <h1 className="font-title text-lg">{slips.length} Slips</h1>
      </div>

      {slips.map((slip) => (
        <SlipCard key={slip.id} slip={slip} isFocused={false} />
      ))}
    </div>
  );
}

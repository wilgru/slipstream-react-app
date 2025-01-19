import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLogin } from "src/authentication/hooks/useLogin";
import { Button } from "src/common/components/Button/Button";
import { Toggle } from "src/common/components/Toggle/Toggle";
import { cn } from "src/common/utils/cn";
import { useCreateSlip } from "src/models/slip/hooks/useCreateSlip";
import { useGetTopics } from "src/topics/hooks/useGetTopics";
import { NavItem } from "./NavItem";

export const Sidebar = () => {
  const { logout } = useLogin();
  const navigate = useNavigate();
  const { createSlip } = useCreateSlip();
  const { topics } = useGetTopics();

  const [searchParams, setSearchParams] = useSearchParams();
  const [expanded, setExpanded] = useState(false);

  const onClickNewSlipButton = async (): Promise<void> => {
    const createdSlip = await createSlip();

    if (createdSlip) {
      searchParams.set("openSlip", createdSlip.id);
      setSearchParams(searchParams);
    }
  };

  const onClickShowSidebarToggle = (): void => {
    setExpanded((currentShowSidebar) => !currentShowSidebar);
  };

  return (
    <aside
      className={cn(
        expanded ? "w-52" : "w-16",
        "p-2 flex flex-col justify-between flex-shrink-0 overflow-y-scroll"
      )}
    >
      <div>
        <section className="p-2 flex flex-col gap-1 text-black">
          <NavItem
            iconName="Rows"
            title={"Stream"}
            to={`/stream/`}
            expanded={expanded}
          ></NavItem>
        </section>

        <section className="p-2 flex flex-col gap-1 text-black">
          {expanded && <h1 className="font-title text-lg">Journals</h1>}
          {topics.map((topic) => (
            <NavItem
              iconName="Book"
              iconColour={topic.colour}
              title={topic.name}
              preview={topic.slipCount}
              to={`/journals/${topic.id}`}
              expanded={expanded}
            ></NavItem>
          ))}
        </section>
      </div>

      <div
        className={`${
          expanded ? "flex-row" : "flex-col-reverse"
        } flex gap-3 justify-around items-center`}
      >
        <Toggle
          onClick={onClickShowSidebarToggle}
          isToggled={expanded}
          iconName="sidebarSimple"
        />

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <div>
              <Button variant="ghost" iconName="gear" />
            </div>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="bg-white border border-black rounded-md p-1 w-40 shadow-lighter"
              sideOffset={2}
              align="start"
            >
              <DropdownMenu.Item
                className="leading-none text-sm p-1 data-[highlighted]:bg-orange-100 data-[highlighted]:text-orange-500 outline-none rounded-sm cursor-pointer"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Log out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <Button
          variant="ghost"
          iconName="plus"
          colour={"orange-500"}
          onClick={onClickNewSlipButton}
        ></Button>
      </div>
    </aside>
  );
};

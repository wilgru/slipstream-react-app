import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "src/components/Button/Button";
import EditSlipModal from "src/components/EditSlipModal/EditSlipModal";
import { Toggle } from "src/components/Toggle/Toggle";
import { colours } from "src/lib/colour/colours.constant";
import { useGetJournals } from "src/lib/journal/hooks/useGetJournals";
import { useLogin } from "src/lib/user/hooks/useLogin";
import { cn } from "src/utils/cn";
import { NavItem } from "./-components/NavItem";

export const Sidebar = () => {
  const { logout } = useLogin();
  const navigate = useNavigate();
  const { journals } = useGetJournals();

  const [showEditSlipModal, setShowEditSlipModal] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
            ghost
            iconName="chatCircle"
            title={"Stream"}
            to={`/stream/`}
            expanded={expanded}
          ></NavItem>

          <NavItem
            ghost
            iconName="flag"
            title={"Flagged"}
            to={`/flagged/`}
            expanded={expanded}
          ></NavItem>
        </section>

        <section className="p-2 flex flex-col gap-1 text-black">
          {expanded && (
            <h1 className="font-title text-lg text-stone-700">Journals</h1>
          )}
          {journals.map((journal) => (
            <NavItem
              iconName={journal.icon}
              colour={journal.colour}
              title={journal.name}
              preview={journal.slipCount}
              to={`/journals/${journal.id}`}
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
                  navigate({ to: "/login" });
                }}
              >
                Log out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button
              variant="ghost"
              iconName="plus"
              colour={colours.orange}
              onClick={() => {
                setShowEditSlipModal(true);
              }}
            />
          </Dialog.Trigger>
          {showEditSlipModal && (
            <EditSlipModal
              onSave={() => {
                setShowEditSlipModal(false);
              }}
            />
          )}
        </Dialog.Root>
      </div>
    </aside>
  );
};

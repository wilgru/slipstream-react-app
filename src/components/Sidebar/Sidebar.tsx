import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "src/components/Button/Button";
import EditSlipModal from "src/components/EditSlipModal/EditSlipModal";
import { colours } from "src/constants/colours.constant";
import { useGetJournals } from "src/hooks/journals/useGetJournals";
import { useLogin } from "src/hooks/users/useLogin";
import { useUser } from "src/hooks/users/useUser";
import { cn } from "src/utils/cn";
import { NavItem } from "../NavItem/NavItem";

export const Sidebar = () => {
  const { logout } = useLogin();
  const { user } = useUser();
  const navigate = useNavigate();
  const { journals } = useGetJournals();

  const [showEditSlipModal, setShowEditSlipModal] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const onClickShowSidebarToggle = (): void => {
    setExpanded((currentShowSidebar) => !currentShowSidebar);
  };

  return (
    <aside className={cn("p-3", expanded && "min-w-60")}>
      <div
        className={cn(
          "flex flex-col flex-shrink-0 justify-between gap-3 h-full"
        )}
      >
        <div className="flex flex-col gap-3 justify-between overflow-y-auto">
          <div
            className={cn(
              "flex items-center gap-2 justify-between",
              expanded ? "flex-row" : "flex-col-reverse"
            )}
          >
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <div>
                  <Button
                    variant={expanded ? "block" : "ghost"}
                    colour={colours.blue}
                    iconName="user"
                  >
                    {expanded ? user?.name : undefined}
                  </Button>
                </div>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="flex flex-col gap-2 bg-white border border-stone-200 text-sm rounded-2xl p-2 w-40 drop-shadow"
                  sideOffset={2}
                  align="start"
                >
                  <DropdownMenu.Item
                    className="leading-none text-sm p-2 outline-none rounded-xl cursor-pointer data-[highlighted]:bg-orange-100 data-[highlighted]:text-orange-500 transition-colors"
                    onClick={() => {
                      logout();
                      navigate({ to: "/login" });
                    }}
                  >
                    Customise
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator className="h-[1px] rounded-full bg-stone-200" />

                  <DropdownMenu.Item
                    className="leading-none text-red-400 text-sm p-2 outline-none rounded-xl cursor-pointer data-[highlighted]:bg-red-100 data-[highlighted]:text-red-500 transition-colors"
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

            <Button
              variant="ghost"
              onClick={onClickShowSidebarToggle}
              iconName={expanded ? "caretLeft" : "caretRight"}
            />
          </div>

          <section
            className={cn(
              "flex flex-col gap-1 bg-white border border-stone-200 rounded-3xl",
              expanded ? "p-2" : "p-1"
            )}
          >
            <NavItem
              ghost
              iconName="house"
              title={"Home"}
              to={`/stream/`}
              expanded={expanded}
            />

            <NavItem
              ghost
              iconName="flag"
              title={"Flagged"}
              to={`/flagged/`}
              expanded={expanded}
            />
          </section>

          <section
            className={cn("flex flex-col gap-1", expanded ? "p-2" : "p-1")}
          >
            {expanded && <h1 className="font-title text-lg ml-2">Journals</h1>}

            {journals.map((journal) => (
              <NavItem
                iconName={journal.icon}
                colour={journal.colour}
                title={journal.name}
                preview={journal.slipCount}
                to={`/journals/${journal.id}`}
                expanded={expanded}
              />
            ))}
          </section>
        </div>

        <div>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button
                iconName="pencil"
                colour={colours.orange}
                onClick={() => {
                  setShowEditSlipModal(true);
                }}
              >
                {expanded ? "New Slip" : undefined}
              </Button>
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
      </div>
    </aside>
  );
};

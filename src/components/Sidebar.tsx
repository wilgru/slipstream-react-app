import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import Tree from "react-d3-tree";
import { Button } from "src/components/Button/Button";
import EditSlipModal from "src/components/EditSlipModal/EditSlipModal";
import { Toggle } from "src/components/Toggle/Toggle";
import { colours } from "src/constants/colours.constant";
import { useGetJournals } from "src/hooks/journals/useGetJournals";
import { useLogin } from "src/hooks/users/useLogin";
import { cn } from "src/utils/cn";
import { NavItem } from "./NavItem";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
  name: "Home",
  children: [
    {
      name: "Art",
      attributes: {
        Slips: "4",
      },
      children: [
        {
          name: "Printing",
          attributes: {
            Slips: "4",
          },
          children: [
            {
              name: "Silkscreen",
            },
          ],
        },
        {
          name: "Ceramics",
          attributes: {
            Slips: "4",
          },
          children: [
            {
              name: "Glazing",
            },
          ],
        },
      ],
    },
  ],
};

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}) => (
  <foreignObject {...foreignObjectProps}>
    <button
      className={cn(
        "w-full flex flex-col items-center justify-center rounded-full p-1",
        nodeDatum.__rd3t.collapsed
          ? "bg-white text-black"
          : "bg-black text-white"
      )}
      onClick={toggleNode}
    >
      <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
      {/* {nodeDatum.children && (
        <button style={{ width: "100%" }} onClick={toggleNode}>
          {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
        </button>
      )} */}
    </button>
  </foreignObject>
);

export const Sidebar = () => {
  const { logout } = useLogin();
  const navigate = useNavigate();
  const { journals } = useGetJournals();

  const [showEditSlipModal, setShowEditSlipModal] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const nodeSize = { x: 100, y: 100 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: -50 };

  const onClickShowSidebarToggle = (): void => {
    setExpanded((currentShowSidebar) => !currentShowSidebar);
  };

  return (
    <aside className={"flex flex-col flex-grow justify-between"}>
      {/* <div className="flex flex-col gap-2 overflow-y-auto">
        <section className="flex flex-col gap-1">
          <NavItem
            ghost
            iconName="pencil"
            title={"Stream"}
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

        <div className="h-[1px] mx-1 bg-stone-300 rounded-full" />

        <section className="flex flex-col gap-1">
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
      </div> */}

      <Tree
        data={orgChart}
        orientation="vertical"
        translate={{ x: 0, y: 0 }}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
      />

      <div className="flex flex-col gap-2">
        <div className="h-[1px] mx-1 bg-stone-300 rounded-full" />

        <div className={cn("flex items-center")}>
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
                className="bg-white border border-stone-300 text-sm rounded-md p-1 w-40 drop-shadow-lg"
                sideOffset={2}
                align="start"
              >
                <DropdownMenu.Item
                  className="leading-none text-sm p-1 outline-none rounded-sm cursor-pointer data-[highlighted]:bg-orange-100 data-[highlighted]:text-orange-500"
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
      </div>
    </aside>
  );
};

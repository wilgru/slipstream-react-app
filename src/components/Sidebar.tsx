import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Tree } from "react-d3-tree";
import { Button } from "src/components/Button/Button";
import EditSlipModal from "src/components/EditSlipModal/EditSlipModal";
import { colours } from "src/constants/colours.constant";
import { useLogin } from "src/hooks/users/useLogin";
import { cn } from "src/utils/cn";

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
    {
      name: "Food",
      attributes: {
        Slips: "4",
      },
      children: [
        {
          name: "Cooking",
          attributes: {
            Slips: "4",
          },
        },
        {
          name: "Baking",
          attributes: {
            Slips: "4",
          },
        },
      ],
    },
    {
      name: "Nationalities",
      attributes: {
        Slips: "4",
      },
      children: [
        {
          name: "French",
          attributes: {
            Slips: "4",
          },
        },
        {
          name: "Italian",
          attributes: {
            Slips: "4",
          },
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
        nodeDatum.__rd3t.collapsed ? "bg-white" : "bg-stone-800"
      )}
      onClick={toggleNode}
    >
      <h3
        className={cn(
          "text-center",
          nodeDatum.__rd3t.collapsed ? "text-stone-800" : "text-white"
        )}
        style={{ textAlign: "center" }}
      >
        {nodeDatum.name}
      </h3>
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

  const [showEditSlipModal, setShowEditSlipModal] = useState(false);

  const nodeSize = { x: 100, y: 100 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: -50 };

  return (
    <aside className={"flex flex-col flex-grow justify-between"}>
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

          <Button
            variant="ghost"
            iconName="tag"
            colour={colours.orange}
            onClick={() => {
              setShowEditSlipModal(true);
            }}
          />

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button
                variant="ghost"
                iconName="pencil"
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

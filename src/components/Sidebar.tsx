import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Tree } from "react-d3-tree";
import { Button } from "src/components/Button/Button";
import EditSlipModal from "src/components/EditSlipModal/EditSlipModal";
import { colours } from "src/constants/colours.constant";
import { useTagTree } from "src/hooks/useTagTree";
import { useLogin } from "src/hooks/users/useLogin";
import { cn } from "src/utils/cn";
import { Icon } from "./Icon/Icon";
import type { TreeNodeDatum } from "react-d3-tree";
import type { Journal } from "src/types/Journal.type";

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}: {
  nodeDatum: TreeNodeDatum;
  toggleNode: () => void;
  foreignObjectProps: { width: number; height: number; x: number };
}) => {
  const journal = nodeDatum.attributes as unknown as Journal;

  return (
    <foreignObject className="flex" {...foreignObjectProps}>
      <button
        style={{ margin: "0 auto" }}
        className={cn(
          "flex items-center gap-2 text-sm font-normal rounded-full py-1 px-2 border shadow-md",
          journal.colour.textPillInverted,
          journal.colour.backgroundPillInverted,
          nodeDatum.__rd3t.collapsed
            ? "border-stone-300"
            : journal.colour.border,
          nodeDatum.__rd3t.collapsed
            ? "text-stone-600"
            : journal.colour.textPill,
          nodeDatum.__rd3t.collapsed
            ? "bg-white"
            : journal.colour.backgroundPill
        )}
        onClick={toggleNode}
      >
        <Icon
          size="sm"
          iconName={journal.icon}
          className={cn(
            nodeDatum.__rd3t.collapsed && journal.colour.text,
            journal.colour.textPillInverted
          )}
        />

        {journal.name}
      </button>
    </foreignObject>
  );
};

export const Sidebar = () => {
  const { logout } = useLogin();
  const navigate = useNavigate();
  const tagTreeData = useTagTree();

  const [showEditSlipModal, setShowEditSlipModal] = useState(false);

  return (
    <aside className={"flex flex-col flex-grow justify-between"}>
      <Tree
        data={tagTreeData}
        orientation="vertical"
        translate={{ x: 0, y: 0 }}
        nodeSize={{ x: 120, y: 120 }}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({
            ...rd3tProps,
            foreignObjectProps: { width: 150, height: 150, x: -75 },
          })
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

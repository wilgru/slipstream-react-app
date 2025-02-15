import { useNavigate } from "@tanstack/react-router";
import { colours } from "src/models/colours/colours.constant";
import { cn } from "src/utils/cn";
import type { Colour } from "src/models/colours/Colour.type";

export type TableOfContentsItem = {
  title: string;
  navigationId: string | null;
  subItems: TableOfContentsItem[];
};

type TableOfContentsProps = {
  items: TableOfContentsItem[];
  activeItemNavigationId: string;
  onJumpTo: (id: string) => void;
  colour?: Colour;
};

export default function TableOfContents({
  items,
  activeItemNavigationId,
  onJumpTo,
  colour = colours.orange,
}: TableOfContentsProps) {
  const navigate = useNavigate();

  const NavigatableLi = ({ item }: { item: TableOfContentsItem }) => {
    const isActive = item.navigationId === activeItemNavigationId;

    return (
      <li
        key={item.title}
        onClick={() => {
          item.navigationId && onJumpTo(item.navigationId);
          navigate({ to: `#${item.navigationId}` });
        }}
      >
        <h2
          className={cn(
            "p-1 text-sm font-normal overflow-x-hidden whitespace-nowrap overflow-ellipsis cursor-pointer rounded-md",
            `hover:${colour.backgroundPill} hover:${colour.textPill}`,
            isActive && colour.backgroundPill,
            isActive && colour.textPill
          )}
        >
          {item.title}
        </h2>

        <ul className="ml-2">
          {item.subItems.map((subItem) => {
            const isNavigatable = !!subItem.navigationId;

            return isNavigatable ? (
              <NavigatableLi item={subItem} />
            ) : (
              <StaticLi item={subItem} />
            );
          })}
        </ul>
      </li>
    );
  };

  const StaticLi = ({ item }: { item: TableOfContentsItem }) => {
    return (
      <li key={item.title}>
        <h2 className="p-1 text-stone-400 text-sm overflow-x-hidden whitespace-nowrap overflow-ellipsis">
          {item.title}
        </h2>

        <ul className="ml-2">
          {item.subItems.map((subItem) => {
            const isNavigatable = !!subItem.navigationId;

            return isNavigatable ? (
              <NavigatableLi item={subItem} />
            ) : (
              <StaticLi item={subItem} />
            );
          })}
        </ul>
      </li>
    );
  };

  return (
    <ul className="max-w-56">
      {items.map((item) => {
        const isNavigatable = !!item.navigationId;

        return isNavigatable ? (
          <NavigatableLi item={item} />
        ) : (
          <StaticLi item={item} />
        );
      })}
    </ul>
  );
}

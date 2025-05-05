import { useNavigate } from "@tanstack/react-router";
import { colours } from "src/constants/colours.constant";
import { cn } from "src/utils/cn";
import type { Colour } from "src/types/Colour.type";

export type TableOfContentsItem = {
  title: string;
  navigationId: string | null;
  italic?: boolean;
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
            "p-1 text-xs font-normal overflow-x-hidden whitespace-nowrap overflow-ellipsis cursor-pointer rounded-md",
            `hover:${colour.backgroundPill} hover:${colour.textPill}`,
            item.italic && "italic",
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
        <h2
          className={cn(
            "p-1 text-stone-400 text-xs overflow-x-hidden whitespace-nowrap overflow-ellipsis",
            item.italic && "italic"
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

  return (
    <ul className="w-40 mr-12 p-3 bg-stone-100 border border-stone-200 rounded-lg shadow-inner">
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

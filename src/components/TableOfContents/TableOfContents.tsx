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
            "px-3 overflow-x-hidden whitespace-nowrap overflow-ellipsis cursor-pointer rounded-full overflow-clip",
            `hover:${colour.backgroundPill} hover:${colour.textPill}`,
            item.italic ? "italic text-sm py-1" : "font-title text-md pt-1",
            isActive && colour.backgroundPill,
            isActive && colour.textPill
          )}
        >
          {item.title}
        </h2>

        <ul>
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
            "px-3 pt-3 text-stone-400 text-xs overflow-x-hidden whitespace-nowrap overflow-ellipsis",
            item.italic && "italic"
          )}
        >
          {item.title}
        </h2>

        <ul>
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
    <ul className="max-w-80 m-4 pl-2 pb-2 border-l-2 border-stone-200 h-fit">
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

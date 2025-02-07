import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { cn } from "src/utils/cn";

export type TableOfContentsItem = {
  title: string;
  navigationId: string | null;
  subItems: TableOfContentsItem[];
};

type TableOfContentsProps = {
  items: TableOfContentsItem[];
};

const findItemWithNavigationId = (
  items: TableOfContentsItem[],
  id: string
): TableOfContentsItem | undefined => {
  for (const item of items) {
    if (item.navigationId === id) {
      return item;
    }

    const foundItem = findItemWithNavigationId(item.subItems, id);
    if (foundItem) {
      return foundItem;
    }
  }

  return undefined;
};

export default function TableOfContents({ items }: TableOfContentsProps) {
  const observer = useRef<IntersectionObserver>();
  const [activeId, setActiveId] = useState("");
  const navigate = useNavigate();

  // TODO move to a hook?
  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.target.id &&
          entry.target.id.includes("TOC-")
        ) {
          const foundItem = findItemWithNavigationId(items, entry.target.id);

          if (!foundItem || !foundItem.navigationId) {
            return;
          }

          setActiveId(foundItem.navigationId);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0% 0% -90% 0px",
    });

    const elements = document.querySelectorAll("div");
    elements.forEach((element) => observer.current?.observe(element));

    return () => observer.current?.disconnect();
  }, [items]);

  const NavigatableLi = ({ item }: { item: TableOfContentsItem }) => {
    return (
      <li
        key={item.title}
        onClick={() => navigate({ to: `#${item.navigationId}` })}
      >
        <h2
          className={cn(
            "p-1 text-sm font-normal cursor-pointer rounded-md hover:text-orange-500 hover:bg-orange-100",
            activeId === item.navigationId
              ? "text-orange-500 bg-orange-100"
              : "text-stone-700"
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
      <>
        <h2 className="p-1 text-stone-400 text-sm">{item.title}</h2>

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
      </>
    );
  };

  return (
    <div className="flex">
      <ul>
        {items.map((item) => {
          const isNavigatable = !!item.navigationId;

          return isNavigatable ? (
            <NavigatableLi item={item} />
          ) : (
            <StaticLi item={item} />
          );
        })}
      </ul>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { cn } from "src/utils/cn";
import type { SlipsGroup } from "src/models/slips/Slip.type";

type TableOfContentsProps = {
  groupedSlips: SlipsGroup[];
};

type TableOfContentsSection = {
  month: string;
  days: { title: string; id: string }[];
};

export default function TableOfContents({
  groupedSlips,
}: TableOfContentsProps) {
  const observer = useRef<IntersectionObserver>();
  const [activeId, setActiveId] = useState("");

  const sections = groupedSlips.reduce(
    (acc: TableOfContentsSection[], group) => {
      const month = group.value.format("MMMM YYYY");
      const section = acc.find((section) => section.month === month);

      const day = {
        title: group.value.format("dddd D"),
        id: group.title,
      };

      if (!section) {
        acc.push({
          month: month,
          days: [day],
        });
      } else {
        section.days.push(day);
      }

      return acc;
    },
    []
  );

  // TODO move to a hook?
  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting && entry.target.id) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "-90% 0% -10% 0px",
    });

    const elements = document.querySelectorAll("div");
    elements.forEach((element) => observer.current?.observe(element));

    return () => observer.current?.disconnect();
  }, []);

  return (
    <div className="flex">
      <ul className="flex flex-col gap-2">
        {sections.map((section) => (
          <li key={section.month}>
            <h2 className="text-stone-700 text-sm font-semibold">
              {section.month}
            </h2>
            <ul className="flex flex-col">
              {section.days.map((day) => (
                <li
                  key={day.title}
                  className={cn(
                    "ml-2 p-1 text-sm font-normal",
                    activeId === day.id
                      ? "text-orange-500 bg-orange-100 rounded-md"
                      : "text-stone-700"
                  )}
                >
                  {day.title}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

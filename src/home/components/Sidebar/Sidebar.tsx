type SidebarProps = {
  sections?: {
    title: string;
    component?: JSX.Element;
  }[];
};

export const Sidebar = ({ sections }: SidebarProps) => {
  return (
    <div className=" w-60 flex-shrink-0 border-r border-stone-700 overflow-y-scroll">
      {sections?.map((section) => (
        <div className="p-2 flex flex-col gap-2 text-stone-700 border-b border-stone-700">
          <p className="text-sm font-medium">{section.title}</p>
          {section.component}
        </div>
      ))}
    </div>
  );
};

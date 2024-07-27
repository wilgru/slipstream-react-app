type SidebarProps = {
  sections?: {
    title: string;
    component?: JSX.Element;
  }[];
};

export const Sidebar = ({ sections }: SidebarProps) => {
  return (
    <aside className=" w-60 flex-shrink-0 border-r bg-white border-black overflow-y-scroll">
      {sections?.map((section) => (
        <section className="p-2 flex flex-col gap-2 text-black">
          <h1 className="font-title text-lg">{section.title}</h1>
          {section.component}
        </section>
      ))}
    </aside>
  );
};

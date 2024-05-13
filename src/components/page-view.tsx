import { FC, ReactNode } from "react";
import { SideBar } from "./side-bar";

type PageViewProps = {
  children: ReactNode;
};

export const PageView: FC<PageViewProps> = ({ children }) => {
  const links = [
    { label: "Estoque", href: "/stock" },
    { label: "Kits", href: "/kits" },
  ];
  return (
    <div className="flex w-full">
      <div>
        <SideBar links={links} />
      </div>
      <div className="px-8 pt-9 w-full">{children}</div>
    </div>
  );
};

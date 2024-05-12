import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";

type SideBarProps = {
  links?: { label: string; href: string }[];
};

export const SideBar: FC<SideBarProps> = ({ links }) => {
  const currPathName = usePathname();
  const Links = () => {
    return (
      <Menu
        className="pt-9"
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.hover`]: {
              backgroundColor: "rgb(241 245 249)",
            },
          },
        }}
      >
        {links?.map((link, index) => (
          <MenuItem
            key={index}
            className={`${currPathName === link.href ? "bg-slate-100" : ""}`}
            component={<Link href={link.href} />}
          >
            {link.label}
          </MenuItem>
        ))}
      </Menu>
    );
  };
  return (
    <div>
      <Sidebar className="h-screen">
        <div className="flex flex-col justify-between h-full">
          <div>{links ? <Links /> : null}</div>
          <div className="self-center pb-8 text-2xl ">Matheus Ltda</div>
        </div>
      </Sidebar>
    </div>
    // <div className="h-screen" style={{ backgroundColor: "#3182ce" }}>
    //   <div className="pt-8">{links ? <Links /> : null}</div>
    // </div>
  );
};

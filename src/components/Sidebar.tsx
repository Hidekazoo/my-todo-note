import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "../styles/sidebar.module.css";

const NavItems = [
  {
    title: "Todo",
    path: "/todo",
  },
];

export const Sidebar: React.FC = () => {
  return (
    <nav className={cn(styles.sidebar)}>
      <SidebarNav>
        {NavItems.map((item, index) => {
          return <SidebarNavItem key={index} {...item} />;
        })}
      </SidebarNav>
    </nav>
  );
};

const SidebarNav: React.FC = (props) => {
  const { children } = props;
  return <ul className={cn(styles.sidebarNav)}>{children}</ul>;
};

interface SidebarNavItemProps {
  title: string;
  path: string;
}
const SidebarNavItem: React.FC<SidebarNavItemProps> = (props) => {
  const { title, path } = props;
  return (
    <li className={cn(styles.sidebarNavItem)}>
      <Link to={path} className={cn(styles.sidebarNavItemLink)}>
        <div className={cn(styles.sidebarNavItemLink)}>{title}</div>
      </Link>
    </li>
  );
};

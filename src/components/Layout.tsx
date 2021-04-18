import React from "react";
import cn from "classnames";
import { Sidebar } from "./Sidebar";
import styles from "../styles/layout.module.css";

interface LayoutProps {
  title: string;
}
export const Layout: React.FC<LayoutProps> = (props) => {
  const { children, title } = props;

  return (
    <div className={cn(styles.layout)}>
      <div className={cn(styles.aside)}>
        <Sidebar />
      </div>
      <main className={cn(styles.main)}>
        <h3 className={cn(styles.title)}>{title}</h3>
        <div>{children}</div>
      </main>
    </div>
  );
};

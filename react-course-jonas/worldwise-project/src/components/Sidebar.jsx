import Logo from "./Logo";
import AppNav from "./AppNav";
import Footer from "./Footer";

import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />

      <Footer />
    </aside>
  );
}

export default Sidebar;

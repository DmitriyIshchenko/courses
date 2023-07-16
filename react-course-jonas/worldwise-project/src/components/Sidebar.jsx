import Logo from "./Logo";
import AppNav from "./AppNav";
import Footer from "./Footer";

import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>list of cities</p>
      <Footer />
    </aside>
  );
}

export default Sidebar;

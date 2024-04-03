import Header from "./Header.js";
import Footer from "./Footer.js";
import React from "react";
import styles from './layout.module.css'; 
const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
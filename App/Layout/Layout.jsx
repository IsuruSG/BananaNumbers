import React from "react";
import "./Layout.css";

const Layout = ({ children, justifyContent }) => {
  return (
    <div
      className="page-container"
      style={{ justifyContent: justifyContent ?? "center" }}>
      {children}
    </div>
  );
};

export default Layout;

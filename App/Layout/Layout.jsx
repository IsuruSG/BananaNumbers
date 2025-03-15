import React from "react";
import "./Layout.css";

const Layout = ({ children }) => {
  return <div className="page-container">{children}</div>;
};

export default Layout;

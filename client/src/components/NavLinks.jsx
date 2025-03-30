import React from "react";
import links from "../utils/links";
import { useDashboardCtxt } from "../pages/DashboardLayout";
import { NavLink } from "react-router-dom";

function NavLinks({ isBigSidebar }) {
  const { toggleSidebar } = useDashboardCtxt();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}>
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;

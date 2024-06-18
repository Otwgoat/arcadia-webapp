import React from "react";
import { Link } from "react-router-dom";

const DashboardNavItem = (props) => {
  return (
    <div
      className={props.dashboardNavItemClassName ?? "dashboardNavItem"}
      onClick={props.onClick}
    >
      <Link className="subh1" to={props.path}>
        {props.title}
      </Link>
    </div>
  );
};

export default DashboardNavItem;

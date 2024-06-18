import React from "react";
import { Link } from "react-router-dom";

const HeaderLinkContainer = (props) => {
  return (
    <div className="linkContainer">
      <Link className={props.linkClassName} to={props.path}>
        {props.title}
      </Link>
    </div>
  );
};

export default HeaderLinkContainer;

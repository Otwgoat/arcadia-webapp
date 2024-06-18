import { ArrowArcLeft } from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";

const PrevLink = (props) => {
  return (
    <Link to={props.link} className="prevLink">
      <ArrowArcLeft
        size={16}
        weight="regular"
        color="#fdf5e9"
        className="prevIcon"
      />
      {props.title}
    </Link>
  );
};

export default PrevLink;

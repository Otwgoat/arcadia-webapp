import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ habitat, animal }) => {
  return (
    <div className="breadcrumbContainer">
      <div className="breadCrumb">
        <Link to="/habitats" className="breadcrumbLink">
          Habitats
        </Link>
        <span> / </span>
        <Link to={`/habitats/${habitat.id}`} className="breadcrumbLink">
          {habitat.name}
        </Link>
        {animal && (
          <>
            <span> / </span>
            <Link
              to={`/habitats/animal/${animal.id}`}
              className="breadcrumbLink"
            >
              {animal && animal.firstName}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default BreadCrumb;

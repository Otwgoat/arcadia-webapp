import React from "react";

const PlanningFormGroup = (props) => {
  return (
    <div className="planningFormGroup">
      <div className="subh1">{props.dayName}</div>
      <label htmlFor={props.opening} className="formLabel">
        Ouverture
      </label>
      <input
        className="formInput"
        type="time"
        id={props.opening}
        name={props.opening}
        defaultValue={props.dayPlanning.ouverture}
        onChange={(e) => props.onChange("ouverture", e.target.value)}
      />
      <label htmlFor={props.closing} className="formLabel">
        Fermeture
      </label>
      <input
        className="formInput"
        type="time"
        id={props.closing}
        name={props.closing}
        defaultValue={props.dayPlanning.fermeture}
        onChange={(e) => props.onChange("fermeture", e.target.value)}
      />
    </div>
  );
};

export default PlanningFormGroup;

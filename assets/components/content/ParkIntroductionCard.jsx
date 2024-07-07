import React from "react";
import CustomButton from "../CustomButton";

const ParkIntroductionCard = (props) => {
  return (
    <div id={props.id} className="parkIntroductionCard ">
      <div className="cardImg imgDiv"></div>
      <div className="cardBody">
        <h3>{props.title}</h3>
        <p>{props.content}</p>
      </div>
      <CustomButton
        path={props.buttonPath}
        title={props.buttonTitle}
        buttonClassName="largeMobileButton"
      />
    </div>
  );
};

export default ParkIntroductionCard;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CustomButton = (props) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  useEffect(() => {
    if (props.submitSuccess) {
      setSubmitSuccess(true);
    }
  }, [props.submitSuccess]);

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);
  return (
    <button
      type={props.type}
      id={props.id}
      className={props.buttonClassName}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {submitSuccess ? (
        <p className="successMessage">{props.successMessage}</p>
      ) : (
        <Link to={props.path}>{props.title}</Link>
      )}
    </button>
  );
};

export default CustomButton;

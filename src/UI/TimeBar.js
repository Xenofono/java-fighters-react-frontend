import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classes from "./TimeBar.module.css";

const TimeBar = props => {
  console.log(props.time);

  const innerStyle = {
    width: props.time + "%",
    height: "100%",
    backgroundColor: props.color ? props.color : "#F975F7"
  };

  const outerStyle= {
    justifyContent: props.color ? "flex-start" : "center"
  }

  return (
    <div className={classes.TimeBarContainer} style={outerStyle}>
      <div style={innerStyle}></div>
    </div>
  );
};

TimeBar.propTypes = {};

export default React.memo(TimeBar);

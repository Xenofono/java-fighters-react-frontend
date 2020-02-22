import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classes from "./TimeBar.module.css";

const TimeBar = props => {

    console.log(props.time)



  const style = {
    width: props.time + "%",
    height: "100%",
    backgroundColor: "#F975F7"
  };

  return (
    <div className={classes.TimeBarContainer}>
      <div style={style}></div>
    </div>
  );
};

TimeBar.propTypes = {};

export default React.memo(TimeBar);

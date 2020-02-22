import React from "react";
import classes from "./Balloons.module.css";

const Balloons = props => {
  const colors = ["red", "green", "blue", "purple"];

  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

  let balloons = [];
  for (let i = 0; i < 10; i++) {
    const height = Math.floor(Math.random() * window.innerHeight);
    const width = Math.floor(Math.random() * window.innerWidth);
    balloons.push(
      <div
        className={classes.ballong}
        style={{
          backgroundColor: randomColor(),
          top: height + "px",
          left: width + "px"
        }}
      ></div>
    );
  }

  return (
    <React.Fragment>
      {balloons}
    </React.Fragment>
  )
};



export default Balloons;

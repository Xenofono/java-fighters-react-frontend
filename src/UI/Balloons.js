import React from "react";
import classes from "./Balloons.module.css";

const Balloons = props => {
  const colors = ["red", "green", "blue", "purple"];

  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

  let balloons = [];
  for (let i = 0; i < 10; i++) {
    const height = Math.floor(Math.random() * window.innerHeight) - 50;
    const width = Math.floor(Math.random() * window.innerWidth) - 50;
    const balloonWidth = Math.floor(Math.random() * 50)
    const balloonHeight = Math.floor(Math.random() * 50)
    balloons.push(
      <div
        className={classes.ballong}
        key={i}
        style={{
          backgroundColor: randomColor(),
          top: height + "px",
          left: width + "px",
          width: balloonWidth,
          height: balloonWidth - 5
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

import React from "react";
import "./Node.css";

export default function Node(props) {
  // TODO use animation to change start and finish nodes
  const extraClassName = props.isFinish
    ? "node-finish"
    : props.isStart
    ? "node-start"
    : "";
  return (
    <div
      id={`node-${props.val}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => props.onMouseDown(props.row, props.col)}
      onMouseEnter={() => props.onMouseEnter(props.row, props.col)}
      onMouseUp={() => props.onMouseUp()}
    ></div>
  );
}

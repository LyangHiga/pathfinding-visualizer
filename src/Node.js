import React from "react";
import "./Node.css";

export default function Node(props) {
  return (
    <div
      id={`node-${props.val}`}
      className={"node"}
      onMouseDown={() => props.onMouseDown(props.row, props.col)}
      onMouseEnter={() => props.onMouseEnter(props.row, props.col)}
      onMouseUp={() => props.onMouseUp()}
    >
      {props.isWeighted ? <span>{props.weight}</span> : ""}
    </div>
  );
}

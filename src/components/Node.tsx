import React from "react";
import styles from "../styles/NodeStyles";

interface NodeProps {
  val: number;
  row: number;
  col: number;
  isWeighted: boolean;
  weight: number;
  onMouseDown(row: number, col: number): void;
  onMouseEnter(row: number, col: number): void;
  onMouseUp(): void;
}

export default function Node(props: NodeProps) {
  const classes = styles();
  return (
    <div
      id={`node-${props.val}`}
      className={classes.node}
      onMouseDown={() => props.onMouseDown(props.row, props.col)}
      onMouseEnter={() => props.onMouseEnter(props.row, props.col)}
      onMouseUp={() => props.onMouseUp()}
    >
      {props.isWeighted ? <span>{props.weight}</span> : ""}
    </div>
  );
}

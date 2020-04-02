import React from 'react';
import './Node.css';
import { NUM_COL } from './consts';

export default function Node(props) {
  const extraClassName = props.isFinish
    ? 'node-finish'
    : props.isStart
    ? 'node-start'
    : '';
  return (
    <div
      id={`node-${props.row * NUM_COL + props.col}`}
      className={`node ${extraClassName}`}
    ></div>
  );
}

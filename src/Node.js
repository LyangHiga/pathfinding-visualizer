import React from 'react';
import './Node.css';

export default function Node(props) {
  const extraClassName = props.isFinish
    ? 'node-finish'
    : props.isStart
    ? 'node-start'
    : '';
  return (
    <div
      id={`node-${props.row}-${props.col}`}
      className={`node ${extraClassName}`}
    ></div>
  );
}

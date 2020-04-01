import React from 'react';
import './Node.css';

export default function Node(props) {
  return <div id={`node-${props.row}-${props.col}`} className={'node'}></div>;
}

// timerNode.js
// Demonstrates: numeric input + unit selection for scheduling/delay

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TimerNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [delay, setDelay] = useState(data?.delay || 1000);
  const [unit, setUnit] = useState(data?.unit || 'ms');

  const handleDelayChange = (e) => {
    setDelay(Number(e.target.value));
    updateNodeField(id, 'delay', Number(e.target.value));
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    updateNodeField(id, 'unit', e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-trigger` },
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode
      id={id}
      title="Timer"
      icon="⏱️"
      accentColor="#F97316"
      handles={handles}
    >
      <div className="node-field-row">
        <div className="node-field" style={{ flex: 2 }}>
          <label className="node-field-label">Delay</label>
          <input
            className="node-field-input"
            type="number"
            value={delay}
            onChange={handleDelayChange}
            min={0}
          />
        </div>
        <div className="node-field" style={{ flex: 1 }}>
          <label className="node-field-label">Unit</label>
          <select
            className="node-field-select"
            value={unit}
            onChange={handleUnitChange}
          >
            <option value="ms">ms</option>
            <option value="s">sec</option>
            <option value="min">min</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};

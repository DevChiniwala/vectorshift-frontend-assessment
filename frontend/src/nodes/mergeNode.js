// mergeNode.js
// Demonstrates: dual-input merging with strategy selection

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input_1`, label: 'input A' },
    { type: 'target', position: Position.Left, id: `${id}-input_2`, label: 'input B' },
    { type: 'source', position: Position.Right, id: `${id}-merged` },
  ];

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon="🔀"
      accentColor="#14B8A6"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-field-label">Strategy</label>
        <select
          className="node-field-select"
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
        >
          <option value="concat">Concatenate</option>
          <option value="interleave">Interleave</option>
          <option value="zip">Zip</option>
          <option value="json_merge">JSON Merge</option>
        </select>
      </div>
      <span className="node-info-text">
        Combine two inputs into a single output using the selected strategy.
      </span>
    </BaseNode>
  );
};

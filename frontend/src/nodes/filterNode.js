// filterNode.js
// Demonstrates: conditional logic, dual output handles (passed/rejected)

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [condition, setCondition] = useState(data?.condition || '');
  const [operator, setOperator] = useState(data?.operator || 'equals');

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
    updateNodeField(id, 'condition', e.target.value);
  };

  const handleOperatorChange = (e) => {
    setOperator(e.target.value);
    updateNodeField(id, 'operator', e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-passed`, label: 'pass' },
    { type: 'source', position: Position.Right, id: `${id}-rejected`, label: 'reject' },
  ];

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      accentColor="#EC4899"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-field-label">Operator</label>
        <select
          className="node-field-select"
          value={operator}
          onChange={handleOperatorChange}
        >
          <option value="equals">Equals</option>
          <option value="contains">Contains</option>
          <option value="greater_than">Greater Than</option>
          <option value="less_than">Less Than</option>
          <option value="regex">Regex Match</option>
        </select>
      </div>
      <div className="node-field">
        <label className="node-field-label">Condition</label>
        <input
          className="node-field-input"
          type="text"
          value={condition}
          onChange={handleConditionChange}
          placeholder="Enter value..."
        />
      </div>
    </BaseNode>
  );
};

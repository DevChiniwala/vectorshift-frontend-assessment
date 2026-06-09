// apiNode.js
// Demonstrates: multiple input handles, dropdown + text fields, multi-handle output

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-url`, label: 'url' },
    { type: 'target', position: Position.Left, id: `${id}-headers`, label: 'headers' },
    { type: 'target', position: Position.Left, id: `${id}-body`, label: 'body' },
    { type: 'source', position: Position.Right, id: `${id}-response` },
  ];

  return (
    <BaseNode
      id={id}
      title="API Call"
      icon="🌐"
      accentColor="#3B82F6"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-field-label">Method</label>
        <select
          className="node-field-select"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div className="node-field">
        <label className="node-field-label">URL</label>
        <input
          className="node-field-input"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com"
        />
      </div>
    </BaseNode>
  );
};

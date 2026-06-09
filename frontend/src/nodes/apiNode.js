// apiNode.js
// Demonstrates: multiple input handles, dropdown + text fields, multi-handle output

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const APINode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
    updateNodeField(id, 'method', e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    updateNodeField(id, 'url', e.target.value);
  };

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
          onChange={handleMethodChange}
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
          onChange={handleUrlChange}
          placeholder="https://api.example.com"
        />
      </div>
    </BaseNode>
  );
};

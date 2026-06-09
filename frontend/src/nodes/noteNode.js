// noteNode.js
// Demonstrates: a handle-free annotation node (pure documentation)

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const NoteNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [text, setText] = useState(
    data?.text || 'Add a note to your pipeline...'
  );

  const handleTextChange = (e) => {
    setText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode
      id={id}
      title="Note"
      icon="📝"
      accentColor="#64748B"
      handles={handles}
    >
      <textarea
        className="node-field-textarea"
        value={text}
        onChange={handleTextChange}
        placeholder="Write a note..."
        rows={3}
        style={{ minHeight: '60px', resize: 'vertical' }}
      />
    </BaseNode>
  );
};

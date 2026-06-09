// noteNode.js
// Demonstrates: a handle-free annotation node (pure documentation)

import { useState } from 'react';
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

  // No handles — this is a pure annotation/comment node
  return (
    <BaseNode
      id={id}
      title="Note"
      icon="📝"
      accentColor="#64748B"
      handles={[]}
    >
      <textarea
        className="node-field-textarea"
        value={text}
        onChange={handleTextChange}
        placeholder="Write a note..."
        rows={3}
        style={{ minHeight: '60px' }}
      />
    </BaseNode>
  );
};

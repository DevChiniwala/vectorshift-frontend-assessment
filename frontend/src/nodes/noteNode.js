// noteNode.js
// Demonstrates: a handle-free annotation node (pure documentation)

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [text, setText] = useState(
    data?.text || 'Add a note to your pipeline...'
  );

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
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note..."
        rows={3}
        style={{ minHeight: '60px' }}
      />
    </BaseNode>
  );
};

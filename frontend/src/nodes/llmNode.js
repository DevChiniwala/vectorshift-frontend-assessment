// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, label: 'system' },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, label: 'prompt' },
    { type: 'source', position: Position.Right, id: `${id}-response` },
  ];

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      accentColor="#8B5CF6"
      handles={handles}
    >
      <span className="node-info-text">
        This is a LLM node. Connect a system prompt and user prompt to generate a response.
      </span>
    </BaseNode>
  );
};

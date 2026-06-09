// textNode.js
// Part 3: Dynamic resizing + variable detection with dynamic handles

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Position, Handle } from 'reactflow';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currText, setCurrText] = useState(data?.text || '{{ input }}');
  const [dimensions, setDimensions] = useState({ width: 220, height: 'auto' });
  const textareaRef = useRef(null);

  // ─── Part 3A: Dynamic Resizing ──────────────────────────
  useEffect(() => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    // Reset height to auto to measure scrollHeight accurately
    textarea.style.height = 'auto';
    const scrollH = textarea.scrollHeight;
    textarea.style.height = `${scrollH}px`;

    // Calculate new node width based on text length
    // Use a hidden mirror div to measure actual text width
    const minWidth = 220;
    const maxWidth = 450;

    // Rough heuristic: ~7px per character, but textarea wraps
    const lines = currText.split('\n');
    const longestLine = lines.reduce((a, b) => (a.length > b.length ? a : b), '');
    const estimatedWidth = Math.max(minWidth, Math.min(maxWidth, longestLine.length * 7.5 + 60));

    setDimensions({
      width: estimatedWidth,
      height: 'auto',
    });
  }, [currText]);

  // ─── Part 3B: Variable Detection ───────────────────────
  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const vars = [];
    const seen = new Set();
    let match;
    while ((match = regex.exec(currText)) !== null) {
      const varName = match[1];
      if (!seen.has(varName)) {
        seen.add(varName);
        vars.push(varName);
      }
    }
    return vars;
  }, [currText]);

  // Build handles: dynamic variable handles on left, output on right
  const rightHandles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  // Calculate positions for variable handles
  const getVarHandleTop = (index, total) => {
    if (total === 1) return 50;
    const start = 25;
    const end = 75;
    return start + (index * (end - start)) / (total - 1);
  };

  return (
    <div
      className="base-node"
      style={{
        '--node-accent': '#F59E0B',
        width: `${dimensions.width}px`,
        transition: 'width 0.2s ease',
      }}
    >
      {/* Dynamic variable handles on the left */}
      {variables.map((varName, i) => {
        const topPercent = getVarHandleTop(i, variables.length);
        return (
          <React.Fragment key={varName}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-var-${varName}`}
              style={{ top: `${topPercent}%` }}
            />
            <span
              className="text-node-var-label"
              style={{ top: `${topPercent}%`, left: '16px' }}
            >
              {varName}
            </span>
          </React.Fragment>
        );
      })}

      {/* Header */}
      <div className="node-header">
        <div
          className="node-header-icon"
          style={{ background: 'rgba(245, 158, 11, 0.13)' }}
        >
          ✏️
        </div>
        <span className="node-header-title">Text</span>
      </div>

      {/* Body */}
      <div className="node-body" style={{ paddingLeft: variables.length > 0 ? '82px' : '20px' }}>
        <div className="node-field">
          <label className="node-field-label">Content</label>
          <textarea
            ref={textareaRef}
            className="node-field-textarea"
            value={currText}
            onChange={handleTextChange}
            placeholder='Type text... use {{ variable }} for inputs'
            rows={1}
            style={{
              overflow: 'hidden',
              transition: 'height 0.15s ease',
            }}
          />
        </div>
        {variables.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {variables.map((v) => (
              <span
                key={v}
                style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  color: '#3B82F6',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '4px',
                  padding: '1px 6px',
                }}
              >
                {v}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right-side output handle */}
      {rightHandles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id}
          style={{ top: '50%' }}
        />
      ))}
    </div>
  );
};

// BaseNode.js
// Reusable node shell — all concrete nodes delegate to this component.
// Accepts a declarative config for handles, icon, title, and accent color.

import React from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  icon,
  accentColor,
  handles = [],
  children,
  style = {},
}) => {
  // Compute evenly-spaced positions for handles on the same side
  const leftHandles = handles.filter(h => h.position === Position.Left);
  const rightHandles = handles.filter(h => h.position === Position.Right);

  const getTopPercent = (index, total) => {
    if (total === 1) return 50;
    // Distribute handles between 40% and 85% to align with body content
    const start = 40;
    const end = 85;
    return start + (index * (end - start)) / (total - 1);
  };

  const renderHandles = (handleGroup) =>
    handleGroup.map((h, i) => {
      const topPercent = getTopPercent(i, handleGroup.length);
      return (
        <React.Fragment key={h.id}>
          <Handle
            type={h.type}
            position={h.position}
            id={h.id}
            style={{ top: `${topPercent}%` }}
          />
          {h.label && (
            <span
              className={`text-node-var-label`}
              style={{
                top: `${topPercent}%`,
                ...(h.position === Position.Left
                  ? { left: '16px', transform: 'translateY(-50%)' }
                  : { right: '16px', left: 'auto', transform: 'translateY(-50%)' }),
              }}
            >
              {h.label}
            </span>
          )}
        </React.Fragment>
      );
    });

  return (
    <div
      className="base-node"
      style={{ '--node-accent': accentColor, ...style }}
    >
      {/* Left-side handles */}
      {renderHandles(leftHandles)}

      {/* Header */}
      <div className="node-header">
        {icon && (
          <div
            className="node-header-icon"
            style={{
              background: accentColor ? `${accentColor}22` : undefined,
            }}
          >
            {icon}
          </div>
        )}
        <span className="node-header-title">{title}</span>
      </div>

      {/* Body */}
      {children && (
        <div 
          className="node-body"
          style={{
            paddingLeft: leftHandles.length > 0 ? '82px' : '20px',
            paddingRight: rightHandles.length > 0 ? '82px' : '20px'
          }}
        >
          {children}
        </div>
      )}

      {/* Right-side handles */}
      {renderHandles(rightHandles)}
    </div>
  );
};

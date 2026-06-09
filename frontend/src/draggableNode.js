// draggableNode.js

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
      title={`Drag to add ${label} node`}
    >
      {icon && (
        <div className="draggable-node-icon" style={{ background: 'var(--bg-elevated)' }}>
          {icon}
        </div>
      )}
      <span className="draggable-node-label">{label}</span>
    </div>
  );
};
export const AlertModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Pipeline Analysis</h3>
        </div>

        <div className="modal-stats">
          <div className="modal-stat-card">
            <span>Nodes: {data?.num_nodes || 0}</span>
          </div>
          <div className="modal-stat-card">
            <span>Edges: {data?.num_edges || 0}</span>
          </div>
          <div className="modal-dag-status">
            <span>DAG Status: {data?.is_dag ? 'Valid' : 'Invalid'}</span>
            <div className={`status-icon ${data?.is_dag ? 'valid' : 'invalid'}`}>
              {data?.is_dag ? '✓' : '✕'}
            </div>
          </div>
        </div>

        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
        <button className="modal-view-details" onClick={onClose}>
          View Details
        </button>
      </div>
    </div>
  );
};

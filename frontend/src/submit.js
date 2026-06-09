// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { AlertModal } from './AlertModal';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }), shallow);

    const [isLoading, setIsLoading] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [toastError, setToastError] = useState(null);

    const handleSubmit = async () => {
        setIsLoading(true);
        setToastError(null);

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setModalData(data);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setToastError('Failed to connect to backend. Is it running?');
            setTimeout(() => setToastError(null), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="submit-area">
                <button 
                    className="submit-button" 
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <div className="spinner" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <div className="status-icon valid" style={{ background: 'transparent', color: 'white', width: 'auto', fontSize: '16px' }}>✓</div>
                            Submit Workflow
                        </>
                    )}
                </button>
            </div>

            <AlertModal 
                isOpen={!!modalData} 
                onClose={() => setModalData(null)} 
                data={modalData} 
            />

            {toastError && (
                <div className="error-toast">
                    {toastError}
                </div>
            )}
        </>
    );
};

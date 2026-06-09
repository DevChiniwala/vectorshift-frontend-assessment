import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div className="pipeline-toolbar">
            <div className="toolbar-content">
                <div className="toolbar-brand">
                    <div className="toolbar-logo">VS</div>
                    <span className="toolbar-title">VectorShift</span>
                </div>
                
                <div className="toolbar-category">
                    <span className="toolbar-category-label">Core</span>
                    <div className="toolbar-items">
                        <DraggableNode type='customInput' label='Input' icon="📥" />
                        <DraggableNode type='customOutput' label='Output' icon="📤" />
                        <DraggableNode type='text' label='Text' icon="📝" />
                    </div>
                </div>
                
                <div className="toolbar-category">
                    <span className="toolbar-category-label">Logic</span>
                    <div className="toolbar-items">
                        <DraggableNode type='llm' label='LLM' icon="🤖" />
                        <DraggableNode type='filter' label='Filter' icon="🔍" />
                        <DraggableNode type='merge' label='Merge' icon="🔀" />
                    </div>
                </div>
                
                <div className="toolbar-category">
                    <span className="toolbar-category-label">Utility</span>
                    <div className="toolbar-items">
                        <DraggableNode type='api' label='API' icon="🌐" />
                        <DraggableNode type='timer' label='Timer' icon="⏱️" />
                        <DraggableNode type='note' label='Note' icon="🗒️" />
                    </div>
                </div>
            </div>
        </div>
    );
};

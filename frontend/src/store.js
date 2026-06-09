// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [
        { id: 'customInput-1', type: 'customInput', position: { x: 100, y: 250 }, data: { id: 'customInput-1', nodeType: 'customInput', inputName: 'user_doc', inputType: 'File' } },
        { id: 'text-1', type: 'text', position: { x: 550, y: 150 }, data: { id: 'text-1', nodeType: 'text', text: 'Analyze the following file:\n{{ user_doc }}\n\nExtract key insights.' } },
        { id: 'llm-1', type: 'llm', position: { x: 1000, y: 250 }, data: { id: 'llm-1', nodeType: 'llm' } },
        { id: 'customOutput-1', type: 'customOutput', position: { x: 1450, y: 250 }, data: { id: 'customOutput-1', nodeType: 'customOutput', outputName: 'insights', outputType: 'Text' } },
        { id: 'api-1', type: 'api', position: { x: 1000, y: 500 }, data: { id: 'api-1', nodeType: 'api', method: 'POST', url: 'https://webhook.site/test' } },
        { id: 'timer-1', type: 'timer', position: { x: 1450, y: 500 }, data: { id: 'timer-1', nodeType: 'timer', delay: 500, unit: 'ms' } },
        { id: 'note-1', type: 'note', position: { x: 100, y: 500 }, data: { id: 'note-1', nodeType: 'note', text: 'This pipeline demonstrates the new BaseNode abstraction, dynamic text nodes with variable handles, and the premium glassmorphism styling.' } }
    ],
    edges: [
        { id: 'e-input-text', source: 'customInput-1', sourceHandle: 'customInput-1-value', target: 'text-1', targetHandle: 'text-1-var-user_doc', type: 'smoothstep', animated: true },
        { id: 'e-text-llm', source: 'text-1', sourceHandle: 'text-1-output', target: 'llm-1', targetHandle: 'llm-1-prompt', type: 'smoothstep', animated: true },
        { id: 'e-llm-output', source: 'llm-1', sourceHandle: 'llm-1-response', target: 'customOutput-1', targetHandle: 'customOutput-1-value', type: 'smoothstep', animated: true },
        { id: 'e-llm-api', source: 'llm-1', sourceHandle: 'llm-1-response', target: 'api-1', targetHandle: 'api-1-body', type: 'smoothstep', animated: true },
        { id: 'e-api-timer', source: 'api-1', sourceHandle: 'api-1-response', target: 'timer-1', targetHandle: 'timer-1-trigger', type: 'smoothstep', animated: true }
    ],
    nodeIDs: {
        'customInput': 1,
        'text': 1,
        'llm': 1,
        'customOutput': 1,
        'api': 1,
        'timer': 1,
        'note': 1
    },
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
  }));

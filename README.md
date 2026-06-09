# VectorShift Pipeline Editor

A state-of-the-art visual node editor and generative AI workflow builder, developed for the VectorShift technical assessment.

## Overview
This application features a highly modular React frontend using `reactflow` paired with a robust Python/FastAPI backend for analyzing the Directed Acyclic Graph (DAG) structures. The design system features a custom glassmorphism UI, a dynamic floating toolbar, and an extensible architecture for creating new node types.

## Features
- **Extensible BaseNode Architecture:** A custom `BaseNode` wrapper handles dynamic handle positioning, internal body padding, and gradient glow styling, allowing you to add new nodes with zero boilerplate.
- **Topological Sorting & DAG Validation:** The Python backend uses Kahn's algorithm to analyze the nodes and edges, checking for circular dependencies and generating the pipeline execution order.
- **Premium Glassmorphic UI:** A dark-mode aesthetic with custom radial gradients, floating pill toolbars, dynamic edge animations, and polished typography.
- **9 Custom Nodes:** Implemented fully functional nodes including:
  - **Core:** Input, Output, Text (with dynamic Regex-based variable extraction)
  - **Logic:** LLM, Filter, Merge
  - **Utility:** API Call, Timer, Note

## Tech Stack
- **Frontend:** React, ReactFlow, Zustand, Axios
- **Backend:** Python, FastAPI, Uvicorn, NetworkX
- **Design:** Custom CSS variables, Inter/Playfair Display Google Fonts

## Getting Started

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies: `pip install -r requirements.txt`
3. Start the FastAPI server: `python -m uvicorn main:app --port 8000`

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Access the app at `http://localhost:3000`

## System Architecture

The most critical design decision in this project was the abstraction of the ReactFlow node UI into a single reusable `<BaseNode>` component. Instead of maintaining styling and handle positioning logic across 9 different node files, the `BaseNode` accepts declarative props (`title`, `icon`, `handles[]`, `accentColor`) and dynamically computes layout. This ensures design consistency and rapid iteration for adding future AI modules.

"""
VectorShift Pipeline Parser Backend
====================================
FastAPI service that accepts a pipeline definition (nodes + edges),
validates its structure, and determines whether the graph forms a
Directed Acyclic Graph (DAG) using Kahn's algorithm.
"""

from collections import deque
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# ── Pydantic Models ──────────────────────────────────────────────────────────

class Node(BaseModel):
    """Represents a single node in the pipeline graph."""
    id: str


class Edge(BaseModel):
    """Represents a directed edge between two nodes."""
    source: str
    target: str


class PipelineRequest(BaseModel):
    """Incoming payload describing the full pipeline."""
    nodes: List[Node]
    edges: List[Edge]


class PipelineResponse(BaseModel):
    """Response containing pipeline analysis results."""
    num_nodes: int
    num_edges: int
    is_dag: bool


# ── Application Setup ────────────────────────────────────────────────────────

app = FastAPI(
    title="VectorShift Pipeline Parser",
    description="Parses pipeline graphs and checks for DAG validity.",
    version="1.0.0",
)

# Allow all origins during development so the React frontend can
# communicate with this backend without CORS issues.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Helper ────────────────────────────────────────────────────────────────────

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Determine whether the directed graph defined by *nodes* and *edges*
    is a DAG using **Kahn's algorithm** (BFS-based topological sort).

    Algorithm
    ---------
    1. Build an adjacency list and compute the in-degree of every node.
    2. Seed a queue with all nodes whose in-degree is 0.
    3. Repeatedly dequeue a node, decrement the in-degree of its
       neighbours, and enqueue any neighbour whose in-degree drops to 0.
    4. If every node is visited the graph is acyclic; otherwise a cycle
       exists.

    Returns ``True`` for an empty graph (0 nodes) as a vacuous truth.
    """
    if not nodes:
        return True

    node_ids = {node.id for node in nodes}

    # Adjacency list: source → [target, …]
    adjacency: dict[str, list[str]] = {nid: [] for nid in node_ids}
    # In-degree counter for each node
    in_degree: dict[str, int] = {nid: 0 for nid in node_ids}

    for edge in edges:
        if edge.source in adjacency and edge.target in in_degree:
            adjacency[edge.source].append(edge.target)
            in_degree[edge.target] += 1

    # Seed the queue with all zero-in-degree nodes
    queue: deque[str] = deque(
        nid for nid, deg in in_degree.items() if deg == 0
    )

    visited_count = 0

    while queue:
        current = queue.popleft()
        visited_count += 1

        for neighbour in adjacency[current]:
            in_degree[neighbour] -= 1
            if in_degree[neighbour] == 0:
                queue.append(neighbour)

    # If we visited every node, no cycle exists → it's a DAG
    return visited_count == len(node_ids)


# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/")
def read_root():
    """Health-check / ping endpoint."""
    return {"Ping": "Pong"}


@app.post("/pipelines/parse", response_model=PipelineResponse)
def parse_pipeline(pipeline: PipelineRequest):
    """
    Accept a pipeline definition and return:
    - ``num_nodes``  – total number of nodes
    - ``num_edges``  – total number of edges
    - ``is_dag``     – whether the graph is a valid DAG
    """
    return PipelineResponse(
        num_nodes=len(pipeline.nodes),
        num_edges=len(pipeline.edges),
        is_dag=is_dag(pipeline.nodes, pipeline.edges),
    )

import { Connection, Node } from '@/generated/prisma';
import toposort from 'toposort';

export const topologicalSort = (
  nodes: Node[],
  connections: Connection[]
): Node[] => {
  // If no connections, return node as-is (they're all independent)
  if (connections.length === 0) {
    return nodes;
  }

  // Create edges array for toposort
  const edges: [string, string][] = connections.map((conn) => [
    conn.fromNodeId,
    conn.toNodeId,
  ]);

  // Add nodes with no connections as self-edges to ensure they're included
  const connectedNodesIds = new Set<string>(
    connections.map((conn) => conn.fromNodeId)
  );
  for (const conn of connections) {
    connectedNodesIds.add(conn.fromNodeId);
    connectedNodesIds.add(conn.toNodeId);
  }

  for (const node of nodes) {
    if (!connectedNodesIds.has(node.id)) {
      edges.push([node.id, node.id]);
    }
  }

  // Perform topological sort
  let sortedNodeIds: string[];
  try {
    sortedNodeIds = toposort(edges);
    // Remove duplicates (from self-edges)
    sortedNodeIds = [...new Set(sortedNodeIds)];
  } catch (error) {
    if (error instanceof Error && error.message.includes('Cyclic')) {
      throw new Error('Workflow contains a cycle');
    }
    throw error;
  }

  // Map sorted IDs back to node objects
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  return sortedNodeIds.map((id) => nodeMap.get(id)!).filter(Boolean);
};

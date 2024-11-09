import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from '3d-force-graph';
import { WebGLRenderer } from 'three';
import { Controls } from './Controls';
import { JSONInput } from './JSONInput';
import { GraphData } from '../types/graph';
import { graphData as initialGraphData } from '../data/graphData';

const ForceGraph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [graphData, setGraphData] = useState<GraphData>(initialGraphData);
  const [orbitInterval, setOrbitInterval] = useState<number | null>(null);
  const [geometryType, setGeometryType] = useState('sphere');
  const [highlightedNode, setHighlightedNode] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const Graph = ForceGraph3D()(containerRef.current)
      .graphData(graphData)
      .nodeLabel(node => showLabels ? (node as any).label : '')
      .nodeColor(node => highlightedNode === (node as any).id 
        ? '#ff0000' 
        : (node as any).color)
      .nodeVal(node => (node as any).size)
      .linkColor(() => '#ffffff')
      .linkWidth(1)
      .linkOpacity(0.3)
      .onNodeHover(node => {
        setHighlightedNode(node ? (node as any).id : null);
        if (node) {
          (containerRef.current as HTMLElement).style.cursor = 'pointer';
        } else {
          (containerRef.current as HTMLElement).style.cursor = 'default';
        }
      })
      .onNodeClick(node => {
        // Aim at node from outside
        const distance = 200;
        const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
        graphRef.current.cameraPosition(
          { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
          node, // lookAt ({ x, y, z })
          3000  // ms transition duration
        );
      });

    const renderer = Graph.renderer() as WebGLRenderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    graphRef.current = Graph;

    // Add force charge
    Graph.d3Force('charge')?.strength(-120);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      if (orbitInterval) {
        clearInterval(orbitInterval);
      }
    };
  }, [graphData, showLabels, geometryType, highlightedNode]);

  const handleStartOrbit = () => {
    if (orbitInterval) {
      clearInterval(orbitInterval);
      setOrbitInterval(null);
    } else {
      let angle = 0;
      const interval = window.setInterval(() => {
        if (graphRef.current) {
          graphRef.current.cameraPosition({
            x: 400 * Math.cos(angle),
            y: 200,
            z: 400 * Math.sin(angle)
          });
          angle += 0.001;
        }
      }, 10);
      setOrbitInterval(interval);
    }
  };

  return (
    <div className="relative w-full h-full">
      <Controls
        onToggleLabels={() => setShowLabels(!showLabels)}
        onAddNode={() => {}}
        onRemoveNode={() => {}}
        onAddLink={() => {}}
        onStartOrbit={handleStartOrbit}
        onFocusScene={() => {
          const duration = 1000;
          graphRef.current?.zoomToFit(duration, 50);
        }}
        onEditNode={() => {}}
        onGeometryChange={setGeometryType}
      />
      <JSONInput onJSONSubmit={setGraphData} />
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default ForceGraph;
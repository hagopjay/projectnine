import React from 'react';
import { Tags, Plus, Minus, Link, RotateCcw, Maximize, Edit } from 'lucide-react';

interface ControlsProps {
  onToggleLabels: () => void;
  onAddNode: () => void;
  onRemoveNode: () => void;
  onAddLink: () => void;
  onStartOrbit: () => void;
  onFocusScene: () => void;
  onEditNode: () => void;
  onGeometryChange: (type: string) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  onToggleLabels,
  onAddNode,
  onRemoveNode,
  onAddLink,
  onStartOrbit,
  onFocusScene,
  onEditNode,
  onGeometryChange,
}) => {
  return (
    <div className="absolute top-4 left-4 bg-black/80 p-4 rounded-lg z-10 flex flex-wrap items-center gap-2">
      <button
        onClick={onToggleLabels}
        className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700 transition-colors"
      >
        <Tags size={16} />
        Toggle Labels
      </button>
      <button
        onClick={onAddNode}
        className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700 transition-colors"
      >
        <Plus size={16} />
        Add Node
      </button>
      <button
        onClick={onRemoveNode}
        className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700 transition-colors"
      >
        <Minus size={16} />
        Remove Node
      </button>
      <button
        onClick={onAddLink}
        className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700 transition-colors"
      >
        <Link size={16} />
        Add Link
      </button>
      <button
        onClick={onStartOrbit}
        className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700 transition-colors"
      >
        <RotateCcw size={16} />
        Orbit Camera
      </button>
      <button
        onClick={onFocusScene}
        className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700 transition-colors"
      >
        <Maximize size={16} />
        Focus Scene
      </button>
      <button
        onClick={onEditNode}
        className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700 transition-colors"
      >
        <Edit size={16} />
        Edit Node
      </button>
      <select
        onChange={(e) => onGeometryChange(e.target.value)}
        className="bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700 transition-colors"
      >
        <option value="sphere">Spheres</option>
        <option value="box">Boxes</option>
        <option value="cone">Cones</option>
        <option value="torus">Torus</option>
      </select>
    </div>
  );
};
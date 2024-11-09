import { GraphData, Node, Link } from '../types/graph';

interface CharacterData {
  [key: string]: {
    [key: string]: any;
  };
}

export const formatJSON = (json: CharacterData): GraphData => {
  const nodes: Node[] = [];
  const links: Link[] = [];
  let nodeId = 0;

  const createNode = (id: string, value: any, parentId?: number, group: number = 0): number => {
    const currentId = nodeId++;
    const isObject = typeof value === 'object' && value !== null;
    const numericValue = !isObject && !isNaN(Number(value)) ? ` (${value})` : '';
    
    nodes.push({
      id: currentId,
      label: `${id}${numericValue}`,
      group,
      color: getColorForGroup(group),
      size: isObject ? 25 : 15,
      img: isObject && group === 0 ? getRandomImage() : undefined
    });

    if (parentId !== undefined) {
      links.push({
        source: parentId,
        target: currentId,
        value: 1
      });
    }

    if (isObject) {
      Object.entries(value).forEach(([key, val]) => {
        createNode(key, val, currentId, group + 1);
      });
    }

    return currentId;
  };

  Object.entries(json).forEach(([key, value]) => {
    createNode(key, value);
  });

  return { nodes, links };
};

const getColorForGroup = (group: number): string => {
  const colors = [
    '#ff6b6b', // red
    '#48dbfb', // blue
    '#1dd1a1', // green
    '#ffd93d', // yellow
    '#6c5ce7', // purple
    '#ff9f43', // orange
    '#a8e6cf', // mint
    '#ff8b94', // pink
  ];
  return colors[group % colors.length];
};

const getRandomImage = (): string => {
  const images = [
    'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1516575334481-f85287c2c82d?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1542931287-023b922fa89b?w=200&h=200&fit=crop'
  ];
  return images[Math.floor(Math.random() * images.length)];
};
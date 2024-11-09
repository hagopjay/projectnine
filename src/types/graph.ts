export interface Node {
  id: number;
  label: string;
  group: number;
  color: string;
  size: number;
  img?: string;
}

export interface Link {
  source: number | string;
  target: number | string;
  value: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}
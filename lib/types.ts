export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ToolCategory;
}

export type ToolCategory = 'text' | 'generators' | 'converters' | 'developers' | 'visual';

export interface ToolCategoryInfo {
  id: ToolCategory;
  name: string;
  description: string;
  icon: string;
}
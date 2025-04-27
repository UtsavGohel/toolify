import { Tool, ToolCategoryInfo } from './types';

export const toolCategories: ToolCategoryInfo[] = [
  {
    id: 'text',
    name: 'Text Tools',
    description: 'Tools for text manipulation and analysis',
    icon: 'Type'
  },
  {
    id: 'generators',
    name: 'Generators',
    description: 'Tools that create various types of content',
    icon: 'Sparkles'
  },
  {
    id: 'converters',
    name: 'Converters',
    description: 'Tools to convert between different formats',
    icon: 'RefreshCw'
  },
  {
    id: 'developers',
    name: 'Developer Tools',
    description: 'Utilities for programmers and developers',
    icon: 'Code2'
  },
  {
    id: 'visual',
    name: 'Visual Tools',
    description: 'Tools for working with colors and visual elements',
    icon: 'Palette'
  }
];

export const tools: Tool[] = [
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, and paragraphs in your text',
    icon: 'FileText',
    category: 'text'
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for your designs',
    icon: 'Text',
    category: 'text'
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Create strong, secure passwords',
    icon: 'KeyRound',
    category: 'generators'
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate random UUIDs/GUIDs',
    icon: 'Hash',
    category: 'generators'
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Create customizable QR codes',
    icon: 'QrCode',
    category: 'generators'
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode or decode Base64 strings',
    icon: 'Binary',
    category: 'converters'
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and debug regular expressions',
    icon: 'Search',
    category: 'developers'
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Select and convert between color formats',
    icon: 'Palette',
    category: 'visual'
  }
];
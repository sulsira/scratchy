import { LanguageMapping, SupportedFileType } from './types';

// Supported file types for scratch files
export const SUPPORTED_FILE_TYPES: SupportedFileType[] = [
  {
    label: 'Markdown',
    description: 'Markdown files',
    fileExtensions: ['.md'],
  },
  {
    label: 'JSON',
    description: 'JSON files',
    fileExtensions: ['.json'],
  },
  {
    label: 'JavaScript',
    description: 'JavaScript files',
    fileExtensions: ['.js', '.jsx'],
  },
  {
    label: 'TypeScript',
    description: 'TypeScript files',
    fileExtensions: ['.ts', '.tsx'],
  },
  {
    label: 'Python',
    description: 'Python files',
    fileExtensions: ['.py'],
  },
];

// Language ID mapping for file extensions
export const LANGUAGE_ID_MAP: LanguageMapping = {
  '.md': 'markdown',
  '.json': 'json',
  '.js': 'javascript',
  '.jsx': 'javascript',
  '.ts': 'typescript',
  '.tsx': 'typescriptreact',
  '.py': 'python',
};

// Command IDs
export const COMMANDS = {
  SHOW: 'scratchy.show',
  SHOW_MARKDOWN_PREVIEW: 'scratchy.showMarkdownPreview',
  SHOW_JAVASCRIPT_PREVIEW: 'scratchy.showJavaScriptPreview',
} as const;

// Storage keys
export const STORAGE_KEYS = {
  SCRATCH_COUNTER: 'scratchCounter',
} as const;

// File naming
export const FILE_NAMING = {
  PREFIX: 'scratch_',
  DIRECTORY: 'scratches',
} as const;

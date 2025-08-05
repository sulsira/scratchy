# Scratchy

**Scratchy** is a lightweight VS Code extension that allows you to quickly create and open temporary scratch files in different programming languages.

## Features

- Choose from popular file types: JavaScript, TypeScript, Python, Markdown, JSON
- Automatically names files using a persistent counter (e.g., `scratch_1.ts`, `scratch_2.md`, etc.)
- Sets the correct language mode for each created file
- Stores files in the OS temp directory
- Quick pick menu to select file type

## Usage

1. Use the keyboard shortcut **Ctrl+Cmd+N** (or open the command palette with ⇧⌘P or Ctrl+Shift+P and run `Scratchy: Create Scratch File`)
2. Select a language
3. A new untitled file will open with the appropriate extension and language mode

![Scratchy Demo](media/scratchy.gif)

## Extension Settings

Currently, there are no configurable settings.

## Requirements

None.

## Development

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- VS Code (for development)

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Launch development instance:
   - Press `F5` in VS Code to launch a new Extension Development Host window
   - Use `Ctrl+Cmd+N` (or `Ctrl+Alt+N` on Windows/Linux) to test the extension

### Code Quality

This project uses ESLint and Prettier for code quality and formatting:

#### Linting

```bash
# Check for linting issues
npm run lint

# Fix auto-fixable linting issues
npm run lint:fix
```

#### Formatting

```bash
# Format all code files
npm run format

# Check if files are properly formatted
npm run format:check
```

#### Type Checking

```bash
# Check TypeScript types
npm run check-types
```

#### All Quality Checks

```bash
# Run all quality checks (linting, formatting, type checking)
npm run compile
```

### VS Code Integration

The project includes VS Code settings for automatic formatting and linting:

- Format on save is enabled
- ESLint auto-fix on save is enabled
- Prettier is set as the default formatter
- Recommended extensions are configured

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Double quotes
- **Semicolons**: Required
- **Trailing commas**: Required in multiline
- **Line length**: 80 characters
- **File encoding**: UTF-8 with LF line endings

## Testing

Tests are written using `vscode-test`. Run them with:

```bash
npm test
```

## License

MIT

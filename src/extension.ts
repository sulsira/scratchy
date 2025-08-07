// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as fs from 'fs/promises';
import os from 'os';
import path from 'path';
import * as vscode from 'vscode';

// Supported file types for scratch files
const supportedFileTypes = [
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

// Persistent scratch file counter
let scratchCounter = 0;

// Generate a unique scratch file URI
async function getNextScratchFilename(
  context: vscode.ExtensionContext,
  extension: string,
): Promise<vscode.Uri> {
  scratchCounter = context.globalState.get<number>('scratchCounter') || 0;
  scratchCounter++;
  await context.globalState.update('scratchCounter', scratchCounter);
  const scratchDir = path.join(os.homedir(), 'scratches');
  await fs.mkdir(scratchDir, { recursive: true });
  const filename = `scratch_${scratchCounter}${extension}`;
  const tempFilePath = path.join(scratchDir, filename);
  return vscode.Uri.file(tempFilePath);
}

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  // Register the command to show the scratch file modal
  const disposable = vscode.commands.registerCommand(
    'scratchy.show',
    async () => {
      // Show the list of supported file types
      const fileTypes = supportedFileTypes.map((f) => f.label);
      const selectedType = await vscode.window.showQuickPick(fileTypes, {
        placeHolder: 'Select a file type',
      });

      if (!selectedType) {
        return;
      }

      // Get the file extension for the selected type
      const fileExtension = supportedFileTypes.find(
        (f) => f.label === selectedType,
      )?.fileExtensions[0];
      if (!fileExtension) {
        return;
      }

      // Create a unique scratch file using a persistent counter
      const tempFile = await getNextScratchFilename(context, fileExtension);
      await vscode.workspace.fs.writeFile(tempFile, Buffer.from(''));

      const doc = await vscode.workspace.openTextDocument(tempFile);

      // Set language based on file extension
      const ext = path.extname(tempFile.fsPath);
      const langIdMap: Record<string, string> = {
        '.md': 'markdown',
        '.json': 'json',
        '.js': 'javascript',
        '.jsx': 'javascript',
        '.ts': 'typescript',
        '.tsx': 'typescriptreact',
        '.py': 'python',
      };
      const langId = langIdMap[ext];
      if (langId) {
        await vscode.languages.setTextDocumentLanguage(doc, langId);
      }

      await vscode.window.showTextDocument(doc);
    },
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

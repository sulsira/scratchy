import { exec } from 'child_process';
import { promisify } from 'util';
import * as vscode from 'vscode';
import { COMMANDS, SUPPORTED_FILE_TYPES } from './constants';
import {
  createScratchFile,
  getLanguageIdForExtension,
  openDocumentWithLanguage,
} from './file-manager';
import { getTemplateForExtension } from './templates';

const execAsync = promisify(exec);

/**
 * Register all extension commands
 */
export function registerCommands(context: vscode.ExtensionContext): void {
  // Register the main scratch file creation command
  const showDisposable = vscode.commands.registerCommand(COMMANDS.SHOW, () =>
    handleCreateScratchFile(context),
  );

  // Register markdown preview command
  const previewDisposable = vscode.commands.registerCommand(
    COMMANDS.SHOW_MARKDOWN_PREVIEW,
    handleShowMarkdownPreview,
  );

  // Register JavaScript preview command
  const jsPreviewDisposable = vscode.commands.registerCommand(
    COMMANDS.SHOW_JAVASCRIPT_PREVIEW,
    handleShowJavaScriptPreview,
  );

  context.subscriptions.push(
    showDisposable,
    previewDisposable,
    jsPreviewDisposable,
  );
}

/**
 * Handle the create scratch file command
 */
async function handleCreateScratchFile(
  context: vscode.ExtensionContext,
): Promise<void> {
  try {
    // Show the list of supported file types
    const fileTypes = SUPPORTED_FILE_TYPES.map((f) => f.label);
    const selectedType = await vscode.window.showQuickPick(fileTypes, {
      placeHolder: 'Select a file type',
    });

    if (!selectedType) {
      return;
    }

    // Get the file extension for the selected type
    const fileExtension = SUPPORTED_FILE_TYPES.find(
      (f) => f.label === selectedType,
    )?.fileExtensions[0];

    if (!fileExtension) {
      vscode.window.showErrorMessage('Invalid file type selected.');
      return;
    }

    // Get template content and create file
    const template = getTemplateForExtension(fileExtension);
    const tempFile = await createScratchFile(context, fileExtension, template);

    // Get language ID and open document
    const languageId = getLanguageIdForExtension(fileExtension);
    if (!languageId) {
      vscode.window.showErrorMessage(
        'Could not determine language for file extension.',
      );
      return;
    }

    const doc = await openDocumentWithLanguage(tempFile, languageId);
    await vscode.window.showTextDocument(doc);

    // Auto-open markdown preview for markdown files
    if (fileExtension === '.md') {
      await vscode.commands.executeCommand(
        'markdown.showPreviewToSide',
        doc.uri,
      );
    }

    // Auto-execute JavaScript files
    if (fileExtension === '.js') {
      await vscode.commands.executeCommand(COMMANDS.SHOW_JAVASCRIPT_PREVIEW);
    }

    vscode.window.showInformationMessage(
      `Created scratch file: ${tempFile.fsPath}`,
    );
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to create scratch file: ${error}`);
  }
}

/**
 * Handle the show markdown preview command
 */
async function handleShowMarkdownPreview(): Promise<void> {
  try {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
      vscode.window.showInformationMessage('No active editor to preview.');
      return;
    }

    const doc = activeEditor.document;

    if (doc.languageId !== 'markdown') {
      vscode.window.showInformationMessage(
        'Active file is not a Markdown file.',
      );
      return;
    }

    // Open preview
    await vscode.commands.executeCommand('markdown.showPreviewToSide', doc.uri);
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to show markdown preview: ${error}`);
  }
}

/**
 * Handle the show JavaScript preview command
 */
async function handleShowJavaScriptPreview(): Promise<void> {
  try {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
      vscode.window.showInformationMessage('No active editor to preview.');
      return;
    }

    const doc = activeEditor.document;

    if (doc.languageId !== 'javascript') {
      vscode.window.showInformationMessage(
        'Active file is not a JavaScript file.',
      );
      return;
    }

    // Create output channel for JavaScript execution
    const outputChannel =
      vscode.window.createOutputChannel('JavaScript Preview');
    outputChannel.show();

    // Get the file path
    const filePath = doc.uri.fsPath;

    // Execute the JavaScript file using Node.js

    outputChannel.appendLine(`🚀 Executing: ${filePath}`);
    outputChannel.appendLine('─'.repeat(50));

    try {
      const { stdout, stderr } = await execAsync(`node "${filePath}"`);

      if (stdout) {
        outputChannel.appendLine('📤 Output:');
        outputChannel.appendLine(stdout);
      }

      if (stderr) {
        outputChannel.appendLine('⚠️  Errors:');
        outputChannel.appendLine(stderr);
      }

      outputChannel.appendLine('─'.repeat(50));
      outputChannel.appendLine('✅ Execution completed');
    } catch (execError: unknown) {
      outputChannel.appendLine('❌ Execution failed:');

      if (execError instanceof Error) {
        outputChannel.appendLine(execError.message);
      } else {
        outputChannel.appendLine(String(execError));
      }

      // Type guard for exec error with stdout/stderr
      if (execError && typeof execError === 'object' && 'stdout' in execError) {
        const error = execError as { stdout?: string; stderr?: string };
        if (error.stdout) {
          outputChannel.appendLine('📤 Output:');
          outputChannel.appendLine(error.stdout);
        }

        if (error.stderr) {
          outputChannel.appendLine('⚠️  Errors:');
          outputChannel.appendLine(error.stderr);
        }
      }
    }
  } catch (error) {
    vscode.window.showErrorMessage(
      `Failed to show JavaScript preview: ${error}`,
    );
  }
}

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { registerCommands } from './commands';

/**
 * This method is called when your extension is activated
 */
export function activate(context: vscode.ExtensionContext): void {
  registerCommands(context);
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate(): void {
  // Cleanup is handled automatically by VS Code
}

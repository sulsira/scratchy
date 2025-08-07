import * as fs from 'fs/promises';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import { FILE_NAMING, LANGUAGE_ID_MAP, STORAGE_KEYS } from './constants';

// Persistent scratch file counter
let scratchCounter = 0;

/**
 * Generate a unique scratch file URI
 */
export async function getNextScratchFilename(
  context: vscode.ExtensionContext,
  extension: string,
): Promise<vscode.Uri> {
  scratchCounter =
    context.globalState.get<number>(STORAGE_KEYS.SCRATCH_COUNTER) || 0;
  scratchCounter++;
  await context.globalState.update(
    STORAGE_KEYS.SCRATCH_COUNTER,
    scratchCounter,
  );

  const scratchDir = path.join(os.homedir(), FILE_NAMING.DIRECTORY);
  await fs.mkdir(scratchDir, { recursive: true });

  const filename = `${FILE_NAMING.PREFIX}${scratchCounter}${extension}`;
  const tempFilePath = path.join(scratchDir, filename);

  return vscode.Uri.file(tempFilePath);
}

/**
 * Create a scratch file with the given template content
 */
export async function createScratchFile(
  context: vscode.ExtensionContext,
  fileExtension: string,
  template: string,
): Promise<vscode.Uri> {
  const tempFile = await getNextScratchFilename(context, fileExtension);
  await vscode.workspace.fs.writeFile(tempFile, Buffer.from(template, 'utf8'));
  return tempFile;
}

/**
 * Open a document and set its language
 */
export async function openDocumentWithLanguage(
  fileUri: vscode.Uri,
  languageId: string,
): Promise<vscode.TextDocument> {
  const doc = await vscode.workspace.openTextDocument(fileUri);
  await vscode.languages.setTextDocumentLanguage(doc, languageId);
  return doc;
}

/**
 * Get language ID for a file extension
 */
export function getLanguageIdForExtension(
  fileExtension: string,
): string | undefined {
  return LANGUAGE_ID_MAP[fileExtension];
}

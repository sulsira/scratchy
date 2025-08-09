import * as vscode from 'vscode';
import { COMMANDS } from './constants';

export class HttpCodeLensProvider implements vscode.CodeLensProvider {
  private _regex: RegExp;

  constructor() {
    // Match HTTP method at the start of a line followed by a URL
    this._regex = /^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\s+\S+/gm;
  }

  async provideCodeLenses(
    document: vscode.TextDocument,
  ): Promise<vscode.CodeLens[]> {
    const codeLenses: vscode.CodeLens[] = [];
    const text = document.getText();

    let matches: RegExpExecArray | null;
    while ((matches = this._regex.exec(text)) !== null) {
      const line = document.lineAt(document.positionAt(matches.index).line);
      const range = new vscode.Range(line.range.start, line.range.end);

      codeLenses.push(
        new vscode.CodeLens(range, {
          title: '$(play) Execute request',
          command: COMMANDS.EXECUTE_HTTP_REQUEST_AT_POSITION,
          arguments: [document.uri, range.start],
        }),
      );
    }

    return codeLenses;
  }
}

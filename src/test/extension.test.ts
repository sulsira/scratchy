import * as vscode from 'vscode';
import { activate } from '../extension';

jest.mock('vscode');

// Helper to simulate extension context
function createMockContext(): any {
  return {
    globalState: {
      get: jest.fn(() => 0),
      update: jest.fn(),
    },
    subscriptions: [],
  };
}

describe('VS Code Extension', () => {
  let context: any;

  beforeEach(() => {
    context = createMockContext();
    jest.clearAllMocks();
  });

  test('It should install the plugin correctly (activate without error)', () => {
    expect(() => activate(context)).not.toThrow();
  });

  test('It should create scratch files correctly', async () => {
    // Simulate command registration and execution
    const commands: Record<string, Function> = {};
    (vscode.commands.registerCommand as jest.Mock).mockImplementation(
      (cmd, cb) => {
        commands[cmd] = cb;
        return { dispose: jest.fn() };
      },
    );

    activate(context);

    // Simulate QuickPick selection for a supported type
    (vscode.window.showQuickPick as jest.Mock).mockResolvedValue('JavaScript');
    (vscode.workspace.fs.writeFile as jest.Mock).mockResolvedValue(undefined);
    (vscode.workspace.openTextDocument as jest.Mock).mockResolvedValue({});
    (vscode.window.showTextDocument as jest.Mock).mockResolvedValue(undefined);
    (vscode.languages.setTextDocumentLanguage as jest.Mock).mockResolvedValue(
      undefined,
    );

    await commands['scratchy.show']();

    expect(vscode.window.showQuickPick).toHaveBeenCalled();
    expect(vscode.workspace.fs.writeFile).toHaveBeenCalled();
    expect(vscode.workspace.openTextDocument).toHaveBeenCalled();
    expect(vscode.window.showTextDocument).toHaveBeenCalled();
  });

  test('It should not create scratch files for unsupported extensions', async () => {
    const commands: Record<string, Function> = {};
    (vscode.commands.registerCommand as jest.Mock).mockImplementation(
      (cmd, cb) => {
        commands[cmd] = cb;
        return { dispose: jest.fn() };
      },
    );

    activate(context);

    // Simulate QuickPick selection for an unsupported type
    (vscode.window.showQuickPick as jest.Mock).mockResolvedValue(
      'UnsupportedType',
    );

    await commands['scratchy.show']();

    expect(vscode.workspace.fs.writeFile).not.toHaveBeenCalled();
    expect(vscode.workspace.openTextDocument).not.toHaveBeenCalled();
    expect(vscode.window.showTextDocument).not.toHaveBeenCalled();
  });
});

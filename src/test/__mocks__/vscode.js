module.exports = {
  window: {
    showQuickPick: jest.fn(),
    showTextDocument: jest.fn(),
    showInformationMessage: jest.fn(),
    showErrorMessage: jest.fn(),
    activeTextEditor: null,
  },
  commands: {
    registerCommand: jest.fn(),
    executeCommand: jest.fn(),
  },
  workspace: {
    fs: {
      writeFile: jest.fn(),
    },
    openTextDocument: jest.fn(),
    onDidOpenTextDocument: jest.fn(),
  },
  languages: {
    setTextDocumentLanguage: jest.fn(),
  },
  Uri: {
    file: jest.fn((path) => ({ fsPath: path })),
  },
};

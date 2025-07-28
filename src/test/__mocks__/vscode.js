module.exports = {
  window: {
    showQuickPick: jest.fn(),
    showTextDocument: jest.fn(),
    showInformationMessage: jest.fn(),
  },
  commands: {
    registerCommand: jest.fn(),
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

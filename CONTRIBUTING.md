# Contributing to Scratchy

Thank you for your interest in contributing to Scratchy! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Code Style](#code-style)
- [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

- Use the GitHub issue template for bugs
- Include detailed steps to reproduce the issue
- Provide your VS Code version and OS information
- Include any error messages or logs

### Suggesting Enhancements

- Use the GitHub issue template for feature requests
- Describe the enhancement and its benefits
- Consider if it aligns with the project's scope

### Pull Requests

- Fork the repository
- Create a feature branch (`git checkout -b feature/amazing-feature`)
- Make your changes
- Add tests for new functionality
- Ensure all tests pass
- Submit a pull request

## Development Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- VS Code (for development)

### Installation

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/sulsira/scratchy.git
   cd scratchy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run compile
   ```

### Running the Extension

1. Press `F5` in VS Code to launch a new Extension Development Host window
2. Use `Ctrl+Cmd+N` (or `Ctrl+Alt+N` on Windows/Linux) to test the extension
3. The extension will create scratch files in the development environment

## Making Changes

### Project Structure

```
scratchy/
├── src/
│   ├── extension.ts          # Main extension logic
│   └── test/                 # Test files
├── media/                    # Extension assets
├── package.json              # Extension manifest
└── README.md                 # Documentation
```

### Key Files to Modify

- `src/extension.ts` - Main extension functionality
- `package.json` - Extension configuration and commands
- `README.md` - Documentation updates

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Tests are located in `src/test/`
- Use Jest as the testing framework
- Mock VS Code APIs using the provided mocks
- Test both success and error scenarios

### Test Guidelines

- Write tests for new features
- Ensure existing tests pass
- Aim for good test coverage
- Test edge cases and error conditions

## Pull Request Process

1. **Create a Feature Branch**
   - Branch from `main`
   - Use descriptive branch names (e.g., `feature/add-python-support`)

2. **Make Your Changes**
   - Follow the code style guidelines
   - Add tests for new functionality
   - Update documentation if needed

3. **Test Your Changes**
   - Run the test suite: `npm test`
   - Test the extension manually in VS Code
   - Ensure no linting errors: `npm run lint`

4. **Submit the PR**
   - Use the PR template
   - Provide a clear description of changes
   - Link any related issues
   - Request review from maintainers

5. **Review Process**
   - Address any review comments
   - Make requested changes
   - Maintainers will merge when approved

## Reporting Bugs

### Before Submitting

- Check existing issues to avoid duplicates
- Try to reproduce the issue in a clean environment
- Gather relevant information (VS Code version, OS, etc.)

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Open VS Code
2. Press 'Ctrl+Cmd+N'
3. Select 'JavaScript'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Environment:**
- OS: [e.g. macOS 14.0]
- VS Code Version: [e.g. 1.85.0]
- Extension Version: [e.g. 0.0.2]

**Additional context**
Add any other context about the problem here.
```

## Suggesting Enhancements

### Enhancement Request Template

```markdown
**Is your feature request related to a problem?**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions.

**Additional context**
Add any other context or screenshots about the feature request.
```

## Code Style

### TypeScript Guidelines

- Use TypeScript strict mode
- Prefer `const` over `let`
- Use meaningful variable and function names
- Add JSDoc comments for public functions
- Use async/await over Promises

### VS Code Extension Guidelines

- Follow VS Code extension best practices
- Use the VS Code API appropriately
- Handle errors gracefully
- Provide meaningful user feedback

### File Naming

- Use kebab-case for file names
- Use PascalCase for classes and interfaces
- Use camelCase for variables and functions

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples

```
feat: add Python file type support
fix: resolve file creation error on Windows
docs: update README with new features
test: add tests for error handling
```

## Getting Help

If you need help with contributing:

- Check existing issues and discussions
- Ask questions in GitHub Discussions
- Review the VS Code extension documentation
- Look at similar open source VS Code extensions

## Recognition

Contributors will be recognized in:
- The project README
- Release notes
- GitHub contributors page

Thank you for contributing to Scratchy! 🎉 
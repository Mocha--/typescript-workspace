# AI Commit Message Generator

[![npm version](https://badge.fury.io/js/%40mooocha%2Fai-commit-message.svg)](https://badge.fury.io/js/%40mooocha%2Fai-commit-message)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Generate intelligent commit messages using AI from your git diff and branch name. This tool leverages Google's Gemini AI models to create concise, meaningful commit messages that follow best practices.

## ✨ Features

- 🤖 **AI-Powered**: Uses Google Gemini models (2.5 Flash, 2.5 Pro, 2.0 Flash) with automatic fallback
- 🎯 **Pattern Matching**: Automatically prefix commit messages based on branch name patterns
- 📝 **Custom Instructions**: Provide specific instructions for commit message style
- 🔧 **Git Hooks**: Install/uninstall git hooks for automatic commit message generation
- 🏗️ **Husky Support**: Works with both traditional git hooks and Husky
- ⚡ **Fast & Reliable**: Multiple model fallbacks ensure high availability
- 🎨 **Customizable**: Control token limits and output format

## 🚀 Installation

### Global Installation

```bash
npm install -g @mooocha/ai-commit-message
```

### Local Installation

```bash
npm install @mooocha/ai-commit-message
```

## 🔑 Setup

1. **Get a Gemini API Key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Set it as an environment variable:

```bash
export GEMINI_API_KEY="your-api-key-here"
```

2. **Add to your shell profile** (optional):
```bash
# Add to ~/.bashrc, ~/.zshrc, or ~/.profile
export GEMINI_API_KEY="your-api-key-here"
```

## 📖 Usage

### Basic Usage

Generate a commit message from your current git diff:

```bash
aimsg
```

### Advanced Options

```bash
# With pattern matching (e.g., "feat: add new feature")
aimsg --pattern feat

# With custom instructions
aimsg --instruction "Keep it simple and focus on the main change"

# With token limit
aimsg --max-tokens 500

# Combine options
aimsg --pattern fix --instruction "Describe the bug fix clearly" --max-tokens 1000
```

### Git Hook Installation

Install a git hook for automatic commit message generation:

```bash
# Install with default settings
aimsg --install-hook

# Install with custom pattern
aimsg --install-hook --pattern feat

# Install with custom instructions
aimsg --install-hook --instruction "Use conventional commit format"

# Install with all options
aimsg --install-hook --pattern fix --instruction "Describe the fix" --max-tokens 800
```

### Git Hook Uninstallation

```bash
aimsg --uninstall-hook
```

## 🎯 Pattern Matching

When you specify a `--pattern`, the tool will:

1. Check if the pattern exists in your current branch name
2. If found, prefix the commit message with `<pattern>:`

**Examples:**
```bash
# Branch: feature/user-authentication
aimsg --pattern feat
# Output: feat: add user authentication system

# Branch: bugfix/login-error
aimsg --pattern fix
# Output: fix: resolve login error handling

# Branch: docs/api-update
aimsg --pattern docs
# Output: docs: update API documentation
```

## 🔧 Git Hooks

The tool supports both traditional git hooks and Husky:

### Traditional Git Hooks
- Installs to `.git/hooks/prepare-commit-msg`
- Automatically runs before each commit
- Generates AI commit message and prepends it

### Husky Integration
- Automatically detects if Husky is installed
- Installs to `.husky/prepare-commit-msg`
- Works seamlessly with existing Husky setup

### Hook Behavior
- Only runs for direct user commits (skips merge, squash, etc.)
- Preserves your original commit message
- Prepends AI-generated message
- Handles errors gracefully

## 📋 CLI Options

| Option | Description | Example |
|--------|-------------|---------|
| `--pattern` | Pattern to match in branch name | `--pattern feat` |
| `--instruction` | Custom instruction for AI | `--instruction "Keep it simple"` |
| `--max-tokens` | Maximum tokens for AI response | `--max-tokens 1000` |
| `--install-hook` | Install git hook | `--install-hook` |
| `--uninstall-hook` | Uninstall git hook | `--uninstall-hook` |

## 🔄 Workflow Examples

### Development Workflow

1. **Start a new feature**:
```bash
git checkout -b feature/user-dashboard
# ... make changes ...
git add .
aimsg --pattern feat --instruction "Focus on user experience improvements"
```

2. **Fix a bug**:
```bash
git checkout -b bugfix/login-error
# ... fix the bug ...
git add .
aimsg --pattern fix --instruction "Describe what was broken and how it's fixed"
```

3. **Update documentation**:
```bash
git checkout -b docs/api-readme
# ... update docs ...
git add .
aimsg --pattern docs --instruction "Explain what documentation was updated"
```

### Automated Workflow with Hooks

1. **Install hook once**:
```bash
aimsg --install-hook --pattern feat --instruction "Use conventional commit format"
```

2. **Commit normally**:
```bash
git add .
git commit
# AI message will be automatically prepended
```

## 🛠️ Development

### Prerequisites
- Node.js 20+
- pnpm (recommended) or npm

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd packages/apps/ai-commit-message

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test

# Run linting
pnpm lint
```

### Scripts
- `pnpm dev` - Development mode with watch
- `pnpm build` - Build the project
- `pnpm test` - Run tests
- `pnpm test:dev` - Run tests in watch mode
- `pnpm lint` - Run linting
- `pnpm lint:fix` - Fix linting issues
- `pnpm types-check` - Run TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Run linting (`pnpm lint`)
6. Commit your changes (`git commit -m 'feat: add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for providing the AI models
- [Commander.js](https://github.com/tj/commander.js) for CLI framework
- [Zod](https://github.com/colinhacks/zod) for runtime type validation

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include your Node.js version, OS, and error messages

---

**Made with ❤️ by Xibo Wang**

# GitHub Copilot Custom Instructions

This directory contains custom instructions that help GitHub Copilot and other AI agents understand the SaveAction Recorder project better.

## 📂 Files

### Repository-wide Instructions

- **`.github/copilot-instructions.md`** - Main instructions file that applies to all files in the repository
  - Project overview and architecture
  - Coding standards and conventions
  - Testing guidelines
  - Git workflow
  - Common tasks and patterns

### Path-specific Instructions

Located in `.github/instructions/`:

- **`background.instructions.md`** - Instructions for `src/background/**/*.ts`
  - Service worker patterns
  - State management with chrome.storage.session
  - Message handling
  - Action ID assignment

- **`content.instructions.md`** - Instructions for `src/content/**/*.ts`
  - Content script architecture
  - Event listener patterns
  - Selector generation
  - Overlay UI guidelines

- **`tests.instructions.md`** - Instructions for `tests/**/*.test.ts`
  - Test structure and patterns
  - Mocking Chrome APIs
  - Coverage requirements
  - Testing best practices

- **`typescript.instructions.md`** - Instructions for `**/*.ts,**/*.tsx`
  - TypeScript best practices
  - Type definitions and guards
  - Error handling patterns
  - Module organization

## 🚀 How to Use

### Automatic (Default)

Custom instructions are **automatically used** by GitHub Copilot when:

- You're working in this repository
- You submit a prompt to Copilot Chat
- You use inline completions

No configuration needed! The instructions are loaded automatically.

### Verify Instructions are Active

In VS Code:

1. Open Copilot Chat
2. Ask a question about the project
3. Check the **References** section in the response
4. You should see `.github/copilot-instructions.md` listed

### Enable/Disable

If you want to disable custom instructions:

1. Open Settings (Ctrl+, / Cmd+,)
2. Search for "instruction file"
3. Uncheck "Code Generation: Use Instruction Files"

## 📝 Writing Custom Instructions

### For New AI Features

When adding a new feature, consider adding instructions:

1. **General guidance** → Update `.github/copilot-instructions.md`
2. **Module-specific** → Add to appropriate `.instructions.md` file
3. **New module** → Create new `.instructions.md` file

### Instruction Format

#### Repository-wide (copilot-instructions.md)

```markdown
# Title

General instructions in natural language.

## Section

- Bullet points
- Code examples
- Best practices
```

#### Path-specific (\*.instructions.md)

```markdown
---
applyTo: 'src/path/**/*.ts'
excludeAgent: ['code-review'] # Optional
---

# Title

Instructions specific to files matching the pattern.
```

### Glob Patterns

- `**/*.ts` - All TypeScript files
- `src/background/**/*.ts` - All TS files in background/
- `**/*.test.ts` - All test files
- `src/**/*.{ts,tsx}` - All TS/TSX files in src/

### Best Practices

✅ **DO:**

- Be specific and actionable
- Include code examples
- Explain "why" not just "what"
- Keep instructions up-to-date
- Use clear section headings
- Provide common patterns

❌ **DON'T:**

- Write vague instructions
- Include outdated information
- Duplicate content across files
- Over-explain obvious things
- Use jargon without explanation

## 🎯 Example Prompts

With these instructions, you can ask:

### General Questions

```
How do I add a new action type to the recorder?
```

### Module-specific

```
How should I handle state in the background service worker?
```

### Testing

```
Write a test for the sanitizer's credit card masking
```

### Debugging

```
Why are action IDs not sequential across page navigation?
```

Copilot will use the relevant instructions to provide context-aware answers!

## 🔗 Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Custom Instructions Guide](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [VS Code Copilot Docs](https://code.visualstudio.com/docs/copilot/copilot-customization)

## 🤝 Contributing

When contributing to this project:

1. Read the custom instructions first
2. Follow the patterns described
3. Update instructions if you add new patterns
4. Test your changes with Copilot to verify instructions work

---

**These instructions help AI agents work with the codebase more effectively!** 🚀

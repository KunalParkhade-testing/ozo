# Contributing to OZO

Thank you for your interest in contributing to OZO! We welcome contributions from everyone.

## Code of Conduct

Please be respectful and constructive in all interactions. We aim to maintain a welcoming and inclusive community.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, etc.)

### Suggesting Features

Feature requests are welcome! Please create an issue describing:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Add tests** for new functionality
4. **Ensure all tests pass** (`pytest` for backend, `npm test` for frontend)
5. **Update documentation** as needed
6. **Submit a pull request** with a clear description of changes

## Development Setup

See [README.md](README.md) for detailed setup instructions.

## Coding Standards

### Backend (Python)

- Follow [PEP 8](https://pep8.org/)
- Use type hints
- Write docstrings for functions and classes
- Keep functions small and focused
- Run `black` for formatting: `black app/`
- Run `flake8` for linting: `flake8 app/`
- Run `mypy` for type checking: `mypy app/`

### Frontend (TypeScript/React)

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use TypeScript for type safety
- Write functional components with hooks
- Keep components small and reusable
- Run `npm run lint` for linting
- Run `npm run format` for formatting

## Testing

- Write tests for all new features
- Maintain or improve code coverage
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)

### Backend Tests

```bash
cd backend
pytest app/tests/ -v
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add waste tracking functionality
fix: resolve login redirect issue
docs: update API documentation
```

## Review Process

1. All PRs require at least one review
2. CI checks must pass
3. Code should follow our standards
4. Tests should be included and passing
5. Documentation should be updated

## Questions?

Feel free to open an issue for any questions or clarifications!

Thank you for contributing to OZO! 🌱

# UI Framework Comparison

This repository contains three Angular prototype applications for a bachelor thesis on UI framework standardization in corporate Angular applications.

## Research Focus

Main research question:

Which UI framework approaches are suitable for the effective and scalable standardization of UI components in corporate Angular applications?

The prototypes compare:

- `bootstrap-app`
- `material-app`
- `primeng-app`

## Shared Comparison Scope

All three apps implement the same frontend-only employee management portal with:

- dashboard
- employee list with filters and pagination
- create/edit employee form with validation
- employee detail view
- style guide / standardization page

The backend is intentionally excluded so the comparison isolates UI framework behavior, standardization support, flexibility, and integration effort.

## Run The Apps

From each app directory:

```bash
npm start
```

Build:

```bash
npm run build
```

## Thesis Matrix

A ready-to-use evaluation matrix for SQ1-SQ3 is available here:

- [docs/thesis-evaluation-matrix.md](docs/thesis-evaluation-matrix.md)

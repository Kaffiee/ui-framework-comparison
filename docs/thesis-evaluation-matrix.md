# Thesis Evaluation Matrix

## Comparison Setup

Application domain:
- Employee Management Portal

Shared scope in all three apps:
- dashboard
- employee list
- create/edit employee form
- employee detail view
- style guide / UI standards page

Method boundary:
- frontend-only
- no real backend
- identical mock data, labels, validation rules, and workflows

Reason for excluding a backend:
- the study isolates UI framework suitability for standardization in Angular applications
- backend concerns would introduce additional variables unrelated to the research question

## SQ1: Which UI Components And Design Areas Are Suitable For Standardization?

| Area | Why it is suitable for standardization | Evidence in prototype |
| --- | --- | --- |
| Navigation and application shell | Repeats across almost every enterprise screen and strongly shapes consistency | Header, sidebar, breadcrumb, page header |
| Forms and validation | Shared field behavior reduces implementation variance and UX inconsistency | Create/edit employee form |
| Tables and filtering | Enterprise apps repeatedly use search, filters, sorting, pagination, and row actions | Employee list |
| Status communication | Standardized badges and tags improve readability and decision-making | Status badges/tags in list and detail view |
| Feedback patterns | Dialogs, toasts, alerts, and empty states influence trust and workflow safety | Deactivate dialog, save feedback, empty state |
| Layout and spacing | Shared page composition improves maintainability and responsiveness | Dashboard cards, form grid, detail layout |
| Theming and visual tokens | Centralized color, typography, and emphasis rules support scalability | Style guide page |

## SQ2: Framework Comparison Matrix

Suggested rating scale:
- `1` = very weak / very high effort
- `3` = moderate
- `5` = very strong / very low effort

For effort-related criteria, `5` means lower effort.

| Criterion | Operationalization | Bootstrap | Angular Material | PrimeNG | Evidence Source |
| --- | --- | --- | --- | --- | --- |
| Standardization potential | How well the framework supports consistent reusable enterprise UI patterns out of the box |  |  |  | UI review across all five views |
| Component breadth | Availability of ready-made components for cards, forms, tables, feedback, status display |  |  |  | Prototype implementation |
| Form standardization | Consistency of fields, labels, errors, spacing, validation feedback |  |  |  | Create/edit employee form |
| Table standardization | Support for structured lists, actions, and status presentation |  |  |  | Employee list page |
| Feedback component support | Quality and ease of dialogs, toasts/snackbars, alerts, empty states |  |  |  | Save, deactivate, empty-state flows |
| Theming and visual consistency | Ease of aligning colors, spacing, typography, and emphasis |  |  |  | Shell, cards, style guide |
| Angular integration effort | Amount of Angular-specific wiring needed for a coherent implementation |  |  |  | Code structure and imports |
| Customization flexibility | How easily the framework can be adapted to company-specific design needs |  |  |  | CSS overrides and component adaptation |
| Override complexity | How difficult it is to modify default behavior or styling without brittle workarounds |  |  |  | CSS review and implementation notes |
| Responsiveness | Ease of adapting layouts and components across viewport sizes |  |  |  | Dashboard, list, form, detail |
| Maintainability | Clarity of resulting code and likelihood of scalable reuse |  |  |  | App structure and component behavior |
| Implementation speed | How quickly the required scope can be delivered with acceptable UX quality |  |  |  | Development effort log |

## Suggested Objective Evidence For SQ2

Record these measurements while writing the thesis:

| Metric | Bootstrap | Angular Material | PrimeNG |
| --- | --- | --- | --- |
| Additional framework packages required |  |  |  |
| Number of framework-specific modules imported in root app |  |  |  |
| Approximate custom CSS effort |  |  |  |
| Need for custom dialog/toast assembly |  |  |  |
| Need for custom table behavior assembly |  |  |  |
| Final production bundle size |  |  |  |

You can also log:
- implementation time per screen
- number of overrides/workarounds
- number of components available out of the box
- number of manual wrapper patterns required

## SQ3: Risks And Limitations Of A Centralized UI Framework

| Risk / Limitation | Typical manifestation | Relevance to the comparison |
| --- | --- | --- |
| Vendor lock-in | Strong dependency on framework-specific components and patterns | Especially relevant when one library provides many specialized widgets |
| Override fragility | Heavy custom styling becomes brittle during upgrades | Important for Bootstrap customization and deep component overrides |
| Design system conflict | Existing company standards do not align with framework defaults | Relevant for all three frameworks |
| Reduced flexibility for special cases | Teams struggle with exceptions outside the standard component set | Important when a centralized standard becomes too rigid |
| Upgrade and migration effort | Breaking changes or theme changes affect many applications | Relevant for long-term corporate adoption |
| Inconsistent adoption across teams | Teams bypass the standard and create parallel patterns | Organizational risk beyond the technical framework choice |
| Bundle size growth | Rich component libraries increase asset size | Especially relevant for feature-rich libraries |

## Recommended Structure For Your Results Chapter

1. Describe the shared prototype scope and fairness rules.
2. Answer SQ1 using the standardized areas from the prototype.
3. Compare Bootstrap, Angular Material, and PrimeNG using the SQ2 matrix.
4. Discuss SQ3 using both technical and organizational risks.
5. Derive the final answer to the main research question from the combined findings.

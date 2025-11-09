# Usage Guide

## Person in Charge Feature

To add a person in charge to any page, add the `personInCharge` field to the page's frontmatter:

```yaml
---
title: "Your Page Title"
personInCharge: "Name (Student ID)"
---
```

Example:
```yaml
---
title: "Research Question"
personInCharge: "John Doe (12345678)"
---
```

This will display a styled badge below the page title showing who is responsible for that section.

## Team Information

Team information is configured in `hugo.toml` and displays on the homepage:

```toml
[params]
  group = 'X'
  teamMembers = [
    'John Doe (12345678)',
    'Tai Man Chan (12340000)',
    'Sy Tsz Ng (987654321)',
    'Damian Desmond (55555555)',
    'Anya Forger (11111111)'
  ]
  course = 'CUS0000 Digital Humanities'
  lastUpdate = '31st February 2099'
```

The team members array will automatically be formatted with commas when displayed on the homepage.

## Recent Updates

1. **Reduced Navigation Bar Height** - More compact header with smaller padding
2. **H1 Titles Restored** - Page titles now display as H1 headings on all pages
3. **Person in Charge** - Each page can show who is responsible for that section
4. **Team Members Array** - Team members in hugo.toml can now be an array for easier management

## Styling

- Navigation bar: Reduced padding from 1rem to 0.5rem
- Header title: Reduced from 1.5rem to 1.3rem
- Person in charge: Styled with colored left border and light background
- Team info: Displayed in a card on the homepage

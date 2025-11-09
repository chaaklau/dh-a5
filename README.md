# Digital Humanities at EdUHK - Assignment 5 and Project Page Template

## Quick Start

```bash
# Clone the repository
git clone https://github.com/chaaklau/dh-a5.git
cd dh-a5

# Start the development server
hugo server

# Visit http://localhost:1313/
```

## Customizing This Template

Follow these four steps to adapt this template for your own digital humanities project:

### 1. Update `hugo.toml` - Configure Site Settings

Edit the configuration file to set up your site metadata and navigation:

```toml
# Basic site information
title = "Your Project Title"
baseURL = "https://yourusername.github.io/your-repo/"

[params]
projectTitle = "Your Project Title"
subtitle = "Your subtitle or tagline"
author = "Your Name"

# Navigation menu - adjust names and URLs
[[menu.main]]
name = "Introduction"
url = "/"
weight = 1

[[menu.main]]
name = "Research Question"  # Change navigation labels
url = "/research/"
weight = 2
# ... continue for all menu items
```

### 2. Update `content/*.md` - Modify Page Content

Edit the Markdown files in the `content/` folder to change what appears on each page:

- `_index.md` - Introduction/About page (homepage)
- `research.md` - Research questions and objectives
- `data.md` - Data sources, description, and metadata
- `results.md` - Methodology and findings with visualizations
- `discussion.md` - Analysis and interpretation
- `references.md` - Works cited in APA format

**Example**: Edit `content/research.md`:
```markdown
---
title: "Research Question"
---

## Primary Research Question

[Write your main research question here]

## Sub-Questions

1. **First sub-question**: [Your question]
2. **Second sub-question**: [Your question]
```

### 3. Update `static/js/*.js` - Modify Visualizations

Use GenAI or edit JavaScript files to change what gets visualized:

- `static/js/visualizations.js` - Chart.js charts (bar, doughnut, grouped bar)
- `static/js/network.js` - D3.js network visualization

**GenAI Prompt Example**:
```
"Modify the loadTopSongsByViews() function in static/js/visualizations.js 
to show the top 15 items instead of 10, and change the colors to 
use a gradient from blue to purple."
```

**Key functions to customize**:
- `loadTopSongsByViews()` - Top items bar chart
- `loadGenreDistribution()` - Pie/doughnut chart
- `loadCombinedGenreComparison()` - Comparison chart
- `loadDataSizeChart()` - Dataset size visualization
- `loadArtistGenreNetwork()` - Network graph (in network.js)

### 4. Add Data and Images

Place your files in the appropriate folders:

**Data files** (`static/data/`):
- Add CSV files: `your-dataset.csv`
- Add JSON files: `network-nodes.json`, `network-links.json`
- Update file references in JavaScript to match your filenames

**Images** (`static/images/`):
- Add static visualizations: `your-chart.png`
- Add any images referenced in your Markdown content

**Example**: If you add `static/data/my-songs.csv`, update the JavaScript:
```javascript
Papa.parse('/data/my-songs.csv', {
    download: true,
    header: true,
    // ... rest of configuration
});
```

---

## Project Structure

```
dh-a5/
├── content/          # Step 2: Edit Markdown content files
├── static/
│   ├── css/         # Optional: Customize styles
│   ├── js/          # Step 3: Edit JavaScript visualizations
│   ├── data/        # Step 4: Add your CSV/JSON data
│   └── images/      # Step 4: Add static images
├── layouts/          # Advanced: Modify HTML templates
└── hugo.toml        # Step 1: Configure site settings
```

## Deployment

Push to `main` branch to automatically deploy via GitHub Actions:

```bash
git add .
git commit -m "Customize project"
git push origin main
```

Enable GitHub Pages: Repository Settings → Pages → Source: GitHub Actions

## Technologies

- Hugo v0.146.7 (static site generator)
- Chart.js (interactive charts)
- D3.js (network visualization)
- Papa Parse (CSV parsing)

## Need Help?

1. **Hugo documentation**: https://gohugo.io/documentation/
2. **Chart.js examples**: https://www.chartjs.org/docs/latest/samples/
3. **D3.js tutorials**: https://d3js.org/
4. **Use GenAI**: Provide code snippets with clear customization requests

# Digital Humanities Hugo Site Template

A minimal Hugo template for digital humanities projects.

## Quick Start

1. **Install Hugo**
   ```bash
   # macOS
   brew install hugo
   
   # Windows
   choco install hugo-extended
   
   # Linux
   snap install hugo
   ```

2. **Clone and Run**
   ```bash
   git clone <your-repo-url>
   cd dh-a5
   hugo server
   ```

3. **View Site**
   Open http://localhost:1313 in your browser

## Project Structure

```
dh-a5/
├── content/
│   ├── _index.md      # Introduction page
│   ├── methods.md     # Research methods
│   ├── results.md     # Results with visualizations
│   ├── discussion.md  # Discussion of findings
│   ├── analysis.md    # Conclusions
│   ├── references.md  # Works cited
│   └── about.md       # About the author
├── data/              # Store your raw datasets here (not served)
├── layouts/           # HTML templates
├── static/
│   ├── css/           # Styling
│   ├── images/        # Save your visualizations here
│   ├── js/            # JavaScript files
│   └── data/          # CSV files for web access (served publicly)
└── hugo.toml          # Site configuration
```

## Site Pages

The template includes these pages in a compact navigation:

1. **Introduction** - Project title, topic, and theme
2. **Methods** - Research questions and methodology
3. **Results** - Findings with visualizations (static images + JavaScript charts)
4. **Discussion** - Interpretation of results
5. **Conclusions** - Summary, limitations, and future research
6. **References** - Works cited
7. **About** - Author information

## Adding Content

Edit the Markdown files in `content/`:

- Update `hugo.toml` with your site title and information
- Add your research questions, methods, and findings to `about.md`
- Place visualization images in `static/images/`
- Reference images in Markdown: `![Description](images/your-chart.png)`

## Adding Visualizations

Visualizations are separated into JavaScript files for better organization:

### JavaScript Visualizations

1. **Create a chart container** in your markdown file:
   ```markdown
   <div class="chart-container">
     <canvas id="myChartId"></canvas>
   </div>
   ```

2. **Add visualization logic** in `static/js/visualizations.js`:
   ```javascript
   function loadMyChart() {
       const ctx = document.getElementById('myChartId');
       if (!ctx) return;
       
       Papa.parse('/data/sample_1960.csv', {
           download: true,
           header: true,
           complete: function(results) {
               // Process data and create chart
               new Chart(ctx, {
                   type: 'bar',
                   data: { /* your data */ },
                   options: { /* your options */ }
               });
           }
       });
   }
   
   // Call in DOMContentLoaded
   document.addEventListener('DOMContentLoaded', function() {
       loadMyChart();
   });
   ```

### Static Images

Save charts as PNG/SVG in `static/images/` and reference them:

```markdown
![Chart Description](images/your-chart.png)
```

### Included Examples

The **Results** page demonstrates:
- Top songs by views (bar chart)
- Genre distribution (doughnut chart)
- Decade comparison (grouped bar chart)
- Static image example

All visualizations load data from `static/data/sample_1960.csv` and `static/data/sample_2000.csv`.

**Important**: CSV files must be in `static/data/` to be accessible by JavaScript. The `data/` folder at the root is for storing your raw datasets but Hugo won't serve those files to the web.

## Customization

### Change Colors

Edit `static/css/style.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
}
```

### Update Site Information

Edit `hugo.toml`:

```toml
title = 'Your Project Title'

[params]
  author = 'Your Name'
  projectTitle = 'Your Project Title'
  subtitle = 'Your project description'
```

## Deployment to GitHub Pages

1. **Update `hugo.toml`**
   ```toml
   baseURL = 'https://yourusername.github.io/repository-name/'
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - The included GitHub Actions workflow will automatically deploy your site

## Word Count Requirement

Your site should contain 1500-3000 words across all pages.

## Support

- Hugo Documentation: https://gohugo.io/documentation/
- GitHub Pages: https://pages.github.com/

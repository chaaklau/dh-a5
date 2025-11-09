---
title: "Results"
---

**Methodology**: This analysis employs computational text analysis and data visualization techniques using Papa Parse for CSV parsing (1,000 song records), Chart.js and D3.js for interactive visualizations, and comparative frequency analysis to identify trends across decades.

---

<div class="viz-section">
  <div class="viz-content">
    <strong>Top Songs by Popularity</strong><br>
    Bar chart of the 10 most-viewed songs from both decades, sorted by view count.<br><br>
    <strong>Key Pattern</strong>: Songs from the 2000s dominate with 50M+ average views, showing the impact of digital streaming platforms.
  </div>
  <div class="viz-chart">
    <canvas id="topSongsChart"></canvas>
  </div>
</div>

<div class="viz-section">
  <div class="viz-content">
    <strong>Genre Evolution</strong><br>
    Grouped bar chart comparing genre prevalence by aggregating tags from both datasets for side-by-side comparison.<br><br>
    <strong>Key Pattern</strong>: Rap music grew from 3% in the 1960s to 22% in the 2000s, reflecting major cultural shifts in popular music.
  </div>
  <div class="viz-chart">
    <canvas id="comparisonChart"></canvas>
  </div>
</div>

<div class="viz-section-full">
  <div class="viz-content">
    <strong>Artist-Genre Network</strong><br>
    Force-directed graph visualizing connections between artists and genres. Genre tags (red nodes) are positioned centrally with artists (blue nodes) connecting to their respective genres.<br><br>
    <strong>Key Pattern</strong>: Network shows 33 nodes with top artists like Radiohead and Eminem bridging multiple genre categories, illustrating cross-genre influence.
  </div>
  <div id="networkGraph" style="width: 100%; height: 500px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; margin-top: 1rem;"></div>
</div>

<div class="viz-section">
  <div class="viz-content">
    <strong>Temporal Heat Map</strong><br>
    Heat map visualizing temporal patterns using color intensity to represent view count density across time periods and genres.<br><br>
    <strong>Key Pattern</strong>: Peak listening hours concentrate between 6-10 PM across all demographics, showing consistent engagement patterns.
  </div>
  <div class="viz-chart">
    <img src="../images/example-chart.png" alt="Heat Map" style="max-width: 100%; height: auto; border-radius: 8px;">
  </div>
</div>

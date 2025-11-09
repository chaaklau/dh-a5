---
title: "Data"
---

**Dataset**: Top 500 Songs from 1960s and 2000s  
**Source**: Kaggle, Genius 
**Access**: `static/data/` folder  
**Link**: [https://example.com/dataset](https://example.com/dataset) *(Replace with actual data source URL)*

This project analyzes two comprehensive datasets containing 500 top English songs from each era:

- `songs_1960_en_top500.csv` - 1960s dataset (500 songs, ~500 KB)
- `songs_2000_en_top500.csv` - 2000s dataset (500 songs, ~1.3 MB)

**Fields**: title, artist, tag (genre), year, views, features, lyrics, id

<div class="chart-container" style="max-width: 600px; margin: 2rem auto;">
  <canvas id="dataSizeChart"></canvas>
</div>

All records are complete with normalized genre tags across both datasets. View counts represent relative popularity metrics.

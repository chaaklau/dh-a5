/**
 * Main Visualizations Script
 * Loads data and creates all charts for the Results page
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadTopSongsByViews();
    loadCombinedGenreComparison();
    loadDataSizeChart();
});

/**
 * Top Songs by Views - Bar Chart
 */
function loadTopSongsByViews() {
    const ctx = document.getElementById('topSongsChart');
    if (!ctx) return;

    Papa.parse('../data/songs_1960_en_top500.csv', {
        download: true,
        header: true,
        complete: function(results1960) {
            Papa.parse('../data/songs_2000_en_top500.csv', {
                download: true,
                header: true,
                complete: function(results2000) {
                    // Combine and sort by views
                    const allSongs = [
                        ...results1960.data.map(s => ({...s, decade: '1960'})),
                        ...results2000.data.map(s => ({...s, decade: '2000'}))
                    ];
                    
                    // Filter out empty rows and sort
                    const topSongs = allSongs
                        .filter(song => song.title && song.views)
                        .sort((a, b) => parseInt(b.views) - parseInt(a.views))
                        .slice(0, 10);
                    
                    const labels = topSongs.map(s => 
                        `${s.title.substring(0, 20)}${s.title.length > 20 ? '...' : ''}`
                    );
                    const views = topSongs.map(s => parseInt(s.views));
                    const colors = topSongs.map(s => 
                        s.decade === '1960' ? 'rgba(52, 152, 219, 0.8)' : 'rgba(231, 76, 60, 0.8)'
                    );
                    const borderColors = topSongs.map(s => 
                        s.decade === '1960' ? 'rgba(52, 152, 219, 1)' : 'rgba(231, 76, 60, 1)'
                    );
                    
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Views',
                                data: views,
                                backgroundColor: colors,
                                borderColor: borderColors,
                                borderWidth: 2
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Top 10 Most Viewed Songs (1960s vs 2000s)',
                                    font: { size: 16, weight: 'bold' }
                                },
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    callbacks: {
                                        afterLabel: function(context) {
                                            const song = topSongs[context.dataIndex];
                                            return [`Artist: ${song.artist}`, `Year: ${song.year}`];
                                        }
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Number of Views'
                                    },
                                    ticks: {
                                        callback: function(value) {
                                            return value.toLocaleString();
                                        }
                                    }
                                },
                                x: {
                                    ticks: {
                                        maxRotation: 45,
                                        minRotation: 45
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }
    });
}

/**
 * Combined Genre Comparison - Grouped Bar Chart
 */
function loadCombinedGenreComparison() {
    const ctx = document.getElementById('comparisonChart');
    if (!ctx) return;

    Papa.parse('../data/songs_1960_en_top500.csv', {
        download: true,
        header: true,
        complete: function(results1960) {
            Papa.parse('../data/songs_2000_en_top500.csv', {
                download: true,
                header: true,
                complete: function(results2000) {
                    // Count genres for both decades
                    const genres1960 = {};
                    const genres2000 = {};
                    
                    results1960.data.forEach(row => {
                        if (row.tag) genres1960[row.tag] = (genres1960[row.tag] || 0) + 1;
                    });
                    
                    results2000.data.forEach(row => {
                        if (row.tag) genres2000[row.tag] = (genres2000[row.tag] || 0) + 1;
                    });
                    
                    // Get all unique genres
                    const allGenres = new Set([
                        ...Object.keys(genres1960),
                        ...Object.keys(genres2000)
                    ]);
                    
                    // Sort by total count
                    const genreArray = Array.from(allGenres).map(genre => ({
                        genre,
                        count1960: genres1960[genre] || 0,
                        count2000: genres2000[genre] || 0,
                        total: (genres1960[genre] || 0) + (genres2000[genre] || 0)
                    })).sort((a, b) => b.total - a.total).slice(0, 8);
                    
                    const labels = genreArray.map(g => g.genre);
                    const data1960 = genreArray.map(g => g.count1960);
                    const data2000 = genreArray.map(g => g.count2000);
                    
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    label: '1960s',
                                    data: data1960,
                                    backgroundColor: 'rgba(52, 152, 219, 0.8)',
                                    borderColor: 'rgba(52, 152, 219, 1)',
                                    borderWidth: 2
                                },
                                {
                                    label: '2000s',
                                    data: data2000,
                                    backgroundColor: 'rgba(231, 76, 60, 0.8)',
                                    borderColor: 'rgba(231, 76, 60, 1)',
                                    borderWidth: 2
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Genre Comparison: 1960s vs 2000s',
                                    font: { size: 16, weight: 'bold' }
                                },
                                legend: {
                                    position: 'top'
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Number of Songs'
                                    }
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Genre'
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }
    });
}

// Data Size Comparison Chart
function loadDataSizeChart() {
    const ctx = document.getElementById('dataSizeChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1960s Dataset', '2000s Dataset'],
            datasets: [{
                label: 'Number of Songs',
                data: [500, 500],
                backgroundColor: ['rgba(52, 152, 219, 0.7)', 'rgba(231, 76, 60, 0.7)'],
                borderColor: ['rgba(52, 152, 219, 1)', 'rgba(231, 76, 60, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Dataset Size Comparison',
                    font: { size: 16, weight: '400' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Songs'
                    }
                }
            }
        }
    });
}

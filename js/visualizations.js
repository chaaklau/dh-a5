/**
 * Main Visualizations Script
 * Loads data and creates all charts for the Results page
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadTopSongsByViews();
    loadGenreDistribution();
    loadCombinedGenreComparison();
});

/**
 * Top Songs by Views - Bar Chart
 */
function loadTopSongsByViews() {
    const ctx = document.getElementById('topSongsChart');
    if (!ctx) return;

    Papa.parse('/data/songs_1960_en_top500.csv', {
        download: true,
        header: true,
        complete: function(results1960) {
            Papa.parse('/data/songs_2000_en_top500.csv', {
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
 * Genre Distribution - Pie Chart for 1960s
 */
function loadGenreDistribution() {
    const ctx = document.getElementById('genreChart');
    if (!ctx) return;

    Papa.parse('/data/songs_1960_en_top500.csv', {
        download: true,
        header: true,
        complete: function(results) {
            const genreCounts = {};
            
            results.data.forEach(row => {
                if (row.tag) {
                    genreCounts[row.tag] = (genreCounts[row.tag] || 0) + 1;
                }
            });
            
            const sortedGenres = Object.entries(genreCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 8);
            
            const labels = sortedGenres.map(item => item[0]);
            const values = sortedGenres.map(item => item[1]);
            
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: values,
                        backgroundColor: [
                            'rgba(52, 152, 219, 0.8)',
                            'rgba(46, 204, 113, 0.8)',
                            'rgba(155, 89, 182, 0.8)',
                            'rgba(241, 196, 15, 0.8)',
                            'rgba(231, 76, 60, 0.8)',
                            'rgba(26, 188, 156, 0.8)',
                            'rgba(230, 126, 34, 0.8)',
                            'rgba(52, 73, 94, 0.8)'
                        ],
                        borderColor: '#ffffff',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Genre Distribution (1960s)',
                            font: { size: 16, weight: 'bold' }
                        },
                        legend: {
                            position: 'right',
                            labels: {
                                padding: 15,
                                font: { size: 12 }
                            }
                        }
                    }
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

    Papa.parse('/data/songs_1960_en_top500.csv', {
        download: true,
        header: true,
        complete: function(results1960) {
            Papa.parse('/data/songs_2000_en_top500.csv', {
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

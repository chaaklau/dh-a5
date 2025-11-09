/**
 * Network Graph Visualization using D3.js
 * Shows relationships between artists and music genres
 * Genre tags appear in the center, artists connect to their respective genres
 */

document.addEventListener('DOMContentLoaded', function() {
    loadArtistGenreNetwork();
});

function loadArtistGenreNetwork() {
    const container = document.getElementById('networkGraph');
    if (!container) return;

    // Set dimensions
    const width = container.offsetWidth;
    const height = 600;

    // Create SVG with proper clipping
    const svg = d3.select('#networkGraph')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', [0, 0, width, height])
        .style('display', 'block');

    // Add zoom behavior
    const g = svg.append('g');
    
    svg.call(d3.zoom()
        .scaleExtent([0.5, 3])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        }));

    // Load data
    Promise.all([
        d3.json('../data/artist-genre-nodes.json'),
        d3.json('../data/artist-genre-links.json')
    ]).then(([nodes, links]) => {
        
        // Create force simulation with genre nodes pulled to center
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links)
                .id(d => d.id)
                .distance(d => 120))
            .force('charge', d3.forceManyBody()
                .strength(d => d.group === 1 ? -800 : -200))  // Genres repel more
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(d => d.size / 2 + 15))
            .force('x', d3.forceX(width / 2).strength(d => d.group === 1 ? 0.3 : 0.05))  // Pull genres to center
            .force('y', d3.forceY(height / 2).strength(d => d.group === 1 ? 0.3 : 0.05));

        // Create links (artists -> genres)
        const link = g.append('g')
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.4)
            .attr('stroke-width', 1.5);

        // Create nodes
        const node = g.append('g')
            .selectAll('g')
            .data(nodes)
            .join('g')
            .call(drag(simulation));

        // Add circles to nodes
        node.append('circle')
            .attr('r', d => d.group === 1 ? 30 : Math.min(d.size / 2, 15))  // Genres larger
            .attr('fill', d => d.group === 1 ? '#e74c3c' : '#3498db')  // Genres red, artists blue
            .attr('stroke', '#fff')
            .attr('stroke-width', d => d.group === 1 ? 3 : 2)
            .style('cursor', 'pointer')
            .style('opacity', 0.9);

        // Add labels to nodes
        node.append('text')
            .text(d => d.label)
            .attr('x', 0)
            .attr('y', d => d.group === 1 ? 5 : 4)  // Center text in genres
            .attr('text-anchor', 'middle')
            .attr('font-size', d => d.group === 1 ? '14px' : '11px')
            .attr('font-weight', d => d.group === 1 ? 'bold' : 'normal')
            .attr('fill', d => d.group === 1 ? '#fff' : '#2c3e50')
            .style('pointer-events', 'none');

        // Add tooltips
        node.append('title')
            .text(d => d.group === 1 ? 
                `Genre: ${d.label}\n${Math.round(d.size/2)} songs` : 
                `Artist: ${d.label}`);

        // Update positions on tick with boundary constraints
        simulation.on('tick', () => {
            // Constrain nodes within boundaries
            nodes.forEach(d => {
                const radius = d.group === 1 ? 30 : Math.min(d.size / 2, 15);
                d.x = Math.max(radius + 10, Math.min(width - radius - 10, d.x));
                d.y = Math.max(radius + 10, Math.min(height - radius - 10, d.y));
            });

            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('transform', d => `translate(${d.x},${d.y})`);
        });

        // Add legend
        const legend = svg.append('g')
            .attr('transform', `translate(${width - 150}, 20)`);

        legend.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 10)
            .attr('fill', '#e74c3c');

        legend.append('text')
            .attr('x', 15)
            .attr('y', 4)
            .text('Genre Tags')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold');

        legend.append('circle')
            .attr('cx', 0)
            .attr('cy', 30)
            .attr('r', 8)
            .attr('fill', '#3498db');

        legend.append('text')
            .attr('x', 15)
            .attr('y', 34)
            .text('Artists')
            .attr('font-size', '12px');

    }).catch(error => {
        console.error('Error loading network data:', error);
        container.innerHTML = '<p style="text-align: center; padding: 2rem; color: #e74c3c;">Error loading network visualization. Please check the data files.</p>';
    });

    // Drag functionality
    function drag(simulation) {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
    }
}

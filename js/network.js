/**
 * Network Graph Visualization using D3.js
 * Shows relationships between music genres
 */

document.addEventListener('DOMContentLoaded', function() {
    loadGenreNetwork();
});

function loadGenreNetwork() {
    const container = document.getElementById('networkGraph');
    if (!container) return;

    // Set dimensions
    const width = container.offsetWidth;
    const height = 500;

    // Create SVG
    const svg = d3.select('#networkGraph')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]);

    // Add zoom behavior
    const g = svg.append('g');
    
    svg.call(d3.zoom()
        .scaleExtent([0.5, 3])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        }));

    // Load data
    Promise.all([
        d3.json('/data/genre-network-nodes.json'),
        d3.json('/data/genre-network-links.json')
    ]).then(([nodes, links]) => {
        
        // Create force simulation
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links)
                .id(d => d.id)
                .distance(d => 100 - d.value / 2))
            .force('charge', d3.forceManyBody().strength(-400))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(d => d.size / 2 + 10));

        // Create links
        const link = g.append('g')
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .attr('stroke-width', d => Math.sqrt(d.value) / 2);

        // Create nodes
        const node = g.append('g')
            .selectAll('g')
            .data(nodes)
            .join('g')
            .call(drag(simulation));

        // Add circles to nodes
        node.append('circle')
            .attr('r', d => d.size / 3)
            .attr('fill', d => d.group === 1 ? '#3498db' : '#e74c3c')
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .style('cursor', 'pointer');

        // Add labels to nodes
        node.append('text')
            .text(d => d.label)
            .attr('x', 0)
            .attr('y', d => d.size / 3 + 15)
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .attr('fill', '#2c3e50')
            .style('pointer-events', 'none');

        // Add tooltips
        node.append('title')
            .text(d => `${d.label}\nSize: ${d.size}\nEra: ${d.group === 1 ? '1960s' : '2000s'}`);

        // Update positions on tick
        simulation.on('tick', () => {
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
            .attr('r', 8)
            .attr('fill', '#3498db');

        legend.append('text')
            .attr('x', 15)
            .attr('y', 4)
            .text('1960s Genres')
            .attr('font-size', '12px');

        legend.append('circle')
            .attr('cx', 0)
            .attr('cy', 25)
            .attr('r', 8)
            .attr('fill', '#e74c3c');

        legend.append('text')
            .attr('x', 15)
            .attr('y', 29)
            .text('2000s Genres')
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

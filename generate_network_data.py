import csv
import json
from collections import defaultdict

# Read both CSV files and extract artist-genre relationships
artist_genres = defaultdict(set)
genre_counts = defaultdict(int)
artist_views = {}

# Process 1960s data
with open('/Users/chaak/dh-a5/static/data/songs_1960_en_top500.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        artist = row['artist'].strip()
        genre = row['tag'].strip()
        views = int(row.get('views', 0))
        
        if artist and genre:
            artist_genres[artist].add(genre)
            genre_counts[genre] += 1
            if artist not in artist_views:
                artist_views[artist] = 0
            artist_views[artist] += views

# Process 2000s data
with open('/Users/chaak/dh-a5/static/data/songs_2000_en_top500.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        artist = row['artist'].strip()
        genre = row['tag'].strip()
        views = int(row.get('views', 0))
        
        if artist and genre:
            artist_genres[artist].add(genre)
            genre_counts[genre] += 1
            if artist not in artist_views:
                artist_views[artist] = 0
            artist_views[artist] += views

# Get top genres (all genres that have at least 10 songs)
top_genres = [(g, c) for g, c in sorted(genre_counts.items(), key=lambda x: x[1], reverse=True) if c >= 10][:10]
top_genre_names = [g[0] for g in top_genres]

print("Top genres:")
for genre, count in top_genres:
    print(f"  {genre}: {count} songs")

# Get top artists for each genre (limit to make network readable)
genre_top_artists = {}
for genre in top_genre_names:
    artists = [(artist, artist_views[artist]) for artist, genres in artist_genres.items() if genre in genres]
    artists.sort(key=lambda x: x[1], reverse=True)
    genre_top_artists[genre] = [a[0] for a in artists[:6]]  # Top 6 artists per genre

print("\nTop artists per genre:")
for genre in top_genre_names:
    print(f"  {genre}: {', '.join(genre_top_artists[genre][:3])}...")

# Create nodes: genres in center (group 1), artists around them (group 2)
nodes = []
node_id_map = {}
node_id = 0

# Add genre nodes
for genre in top_genre_names:
    nodes.append({
        "id": genre,
        "label": genre.upper(),
        "group": 1,
        "size": genre_counts[genre] * 2  # Size based on number of songs
    })
    node_id_map[genre] = genre
    node_id += 1

# Add artist nodes (top artists for visualization)
artists_added = set()
for genre in top_genre_names:
    for artist in genre_top_artists[genre]:
        if artist not in artists_added:
            nodes.append({
                "id": artist,
                "label": artist,
                "group": 2,
                "size": min(artist_views[artist] / 100000, 50) + 10  # Size based on views
            })
            node_id_map[artist] = artist
            artists_added.add(artist)
            node_id += 1

# Create links: artists → genres
links = []
for genre in top_genre_names:
    for artist in genre_top_artists[genre]:
        if artist in node_id_map:
            links.append({
                "source": artist,
                "target": genre,
                "value": 3  # Connection strength
            })

print(f"\nNetwork summary:")
print(f"  Nodes: {len(nodes)} ({len(top_genre_names)} genres + {len(artists_added)} artists)")
print(f"  Links: {len(links)}")

# Save to JSON files
with open('/Users/chaak/dh-a5/static/data/artist-genre-nodes.json', 'w') as f:
    json.dump(nodes, f, indent=2)

with open('/Users/chaak/dh-a5/static/data/artist-genre-links.json', 'w') as f:
    json.dump(links, f, indent=2)

print("\nSaved network data files!")

import { authors } from './authors';

interface Post {
  title: string;
  slug: string;
  author: typeof authors[keyof typeof authors];
  excerpt: string;
  content: string;
  publishDate: Date;
  category: string;
  tags: string[];
  imageUrl: string;
}

// Helper function to get random author
function getRandomAuthor() {
  const authorKeys = Object.keys(authors);
  return authors[authorKeys[Math.floor(Math.random() * authorKeys.length)]];
}

export const posts: Post[] = [
  {
    title: "Quantum Teleportation Breakthrough",
    slug: "quantum-teleportation-breakthrough",
    author: authors['albert-memenstein'],
    excerpt: "In a groundbreaking experiment, researchers have successfully teleported quantum information across a record-breaking distance of 100 kilometers.",
    content: `# Quantum Teleportation Breakthrough...`,
    publishDate: new Date('2024-03-15'),
    category: "Quantum Physics",
    tags: ["quantum physics", "teleportation", "technology", "research"],
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb"
  },
  {
    title: "Dark Matter Map Reveals Cosmic Web Structure",
    slug: "dark-matter-map",
    author: authors['neil-degrassi-tyson'],
    excerpt: "Using advanced gravitational lensing techniques, scientists have created the most detailed map yet of dark matter distribution.",
    content: `# Dark Matter Map Reveals Cosmic Web Structure...`,
    publishDate: new Date('2024-03-14'),
    category: "Cosmology",
    tags: ["dark matter", "cosmology", "mapping", "universe"],
    imageUrl: "https://images.unsplash.com/photo-1465101162946-4377e57745c3"
  },
  {
    title: "Mysterious Fast Radio Bursts: New Pattern Discovered",
    slug: "fast-radio-bursts-pattern",
    author: authors['carl-spacegan'],
    excerpt: "Astronomers have identified a repeating pattern in fast radio bursts that could help unlock the mystery of these cosmic phenomena.",
    content: `# Mysterious Fast Radio Bursts...`,
    publishDate: new Date('2024-03-13'),
    category: "Radio Astronomy",
    tags: ["radio astronomy", "FRBs", "space", "discovery"],
    imageUrl: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3"
  },
  {
    title: "James Webb Telescope Spots Ancient Galaxy Cluster",
    slug: "webb-ancient-galaxy-cluster",
    author: authors['michio-jokeaku'],
    excerpt: "The James Webb Space Telescope has discovered a massive galaxy cluster from the early universe, challenging our understanding of galaxy formation.",
    content: `# Ancient Galaxy Cluster Discovery...`,
    publishDate: new Date('2024-03-12'),
    category: "Galaxies",
    tags: ["webb telescope", "galaxies", "early universe", "astronomy"],
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564"
  },
  {
    title: "Supermassive Black Hole's Dance Revealed",
    slug: "black-hole-dance",
    author: authors['stephen-hawkmeme'],
    excerpt: "New observations reveal an intricate orbital dance between two supermassive black holes at the center of a distant galaxy.",
    content: `# Supermassive Black Hole Dance...`,
    publishDate: new Date('2024-03-11'),
    category: "Black Holes",
    tags: ["black holes", "gravity", "galaxies", "space"],
    imageUrl: "https://images.unsplash.com/photo-1462332420958-a05d1e002413"
  },
  {
    title: "Mars' Ancient Rivers: New Evidence Found",
    slug: "mars-ancient-rivers",
    author: authors['katie-memeck'],
    excerpt: "NASA's Perseverance rover has uncovered compelling evidence of ancient river systems on Mars, suggesting a wet past.",
    content: `# Mars' Ancient Rivers...`,
    publishDate: new Date('2024-03-10'),
    category: "Planetary Science",
    tags: ["mars", "water", "planets", "nasa"],
    imageUrl: "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700"
  },
  {
    title: "Quantum Gravity: A New Theory Emerges",
    slug: "quantum-gravity-theory",
    author: authors['brian-greenfunny'],
    excerpt: "Scientists propose a groundbreaking theory that could finally unite quantum mechanics and gravity.",
    content: `# Quantum Gravity Theory...`,
    publishDate: new Date('2024-03-09'),
    category: "Theoretical Physics",
    tags: ["quantum physics", "gravity", "theory", "physics"],
    imageUrl: "https://images.unsplash.com/photo-1462331321792-cc44368b8894"
  },
  // Add more posts...
];

// Helper functions
export function getRecentPosts(limit: number = 3): Post[] {
  return [...posts]
    .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())
    .slice(0, limit);
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter(post => post.category === category);
}

export function getPostsByTag(tag: string): Post[] {
  return posts.filter(post => post.tags.includes(tag));
}

export function getRelatedPosts(currentPost: Post, limit: number = 3): Post[] {
  return posts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => ({
      post,
      relevance: [
        ...post.tags.filter(tag => currentPost.tags.includes(tag)),
        post.category === currentPost.category ? post.category : null
      ].filter(Boolean).length
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map(({ post }) => post);
}
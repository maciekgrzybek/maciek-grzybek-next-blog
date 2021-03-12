import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), 'content/_posts');
const pagesDirectory = join(process.cwd(), 'content/_pages');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

function readFile(fullPath) {
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { data, content };
}

export function getPage(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(pagesDirectory, `${realSlug}.md`);
  const { data, content } = readFile(fullPath);

  return { data, content };
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const { data, content } = readFile(fullPath);

  return fields.reduce((accumulator, nextField) => {
    // Ensure only the minimal needed data is exposed
    if (nextField === 'slug') {
      accumulator[nextField] = realSlug;
    }
    if (nextField === 'content') {
      accumulator[nextField] = content;
    }

    if (data[nextField]) {
      accumulator[nextField] = data[nextField];
    }
    return accumulator;
  }, {});
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

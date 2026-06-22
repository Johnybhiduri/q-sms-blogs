import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");
const BASE_PATH = "/blog";

function calculateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      description: data.description as string,
      coverImage: data.coverImage ? `${BASE_PATH}${data.coverImage}` : null,
      coverImageFit: (data.coverImageFit as "cover" | "contain") || "contain",
      readingTime: calculateReadingTime(content),
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString().replace(/src="\//g, `src="${BASE_PATH}/`);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    coverImage: data.coverImage ? `${BASE_PATH}${data.coverImage}` : null,
    coverImageFit: (data.coverImageFit as "cover" | "contain") || "contain",
    readingTime: calculateReadingTime(content),
    contentHtml,
  };
}
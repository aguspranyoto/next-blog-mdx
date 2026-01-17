import fs from "fs";
import path from "path";

export type PostMeta = {
  title: string;
  description?: string;
  date?: string;
  slug: string;
  author?: { name: string; avatar?: string } | string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const posts: PostMeta[] = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, "");
    try {
      let mod: any;
      try {
        mod = await import(`@/content/${slug}.mdx`);
      } catch {
        mod = await import(`@/content/${slug}.md`);
      }

      const meta = mod.metadata ?? mod.frontmatter ?? {};
      posts.push({
        slug,
        title: meta.title ?? slug,
        description: meta.description ?? "",
        date: meta.date ?? "",
        author: meta.author ?? { name: "" },
      });
    } catch (e) {
      // ignore files that fail to import
    }
  }

  // sort by date desc when available
  posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return posts;
}

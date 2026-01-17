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
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const posts: PostMeta[] = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, "");
    try {
      const fullPath = path.join(CONTENT_DIR, file);
      const fileUrl = `file://${fullPath}`;
      let mod: any | undefined;

      try {
        mod = await import(fileUrl);
      } catch (err) {
        // If direct import fails, try reading file and fallback to simple metadata parse
        try {
          const raw = fs.readFileSync(fullPath, "utf8");
          // try to extract a JS `export const metadata = { ... }` block
          const m = raw.match(/export\s+const\s+metadata\s*=\s*(\{[\s\S]*?\})/);
          if (m) {
            // eslint-disable-next-line no-eval
            const parsed = eval(`(${m[1]})`);
            mod = { metadata: parsed };
          }
        } catch {}
      }

      const meta = (mod && (mod.metadata ?? mod.frontmatter)) ?? {};
      posts.push({
        slug,
        title: meta.title ?? slug,
        description: meta.description ?? "",
        date: meta.date ?? "",
        author: meta.author ?? { name: "" },
      });
    } catch (e) {
      // ignore files that fail to import/parse
    }
  }

  // sort by date desc when available
  posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return posts;
}

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const mod = await import(`@/content/${slug}.mdx`);
    const meta = (mod as any).metadata ?? {};

    return {
      title: meta.title,
      description: meta.description,
      authors: meta.author ? [{ name: meta.author }] : undefined,
    };
  } catch (err) {
    return {
      title: "Post",
      description: "Blog post",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/content/${slug}.mdx`);

  return <Post />;
}

export function generateStaticParams() {
  return [
    { slug: "crafting-beautiful-articles-with-mdx-in-next-js" },
    { slug: "mastering-mdx" },
  ];
}

export const dynamicParams = false;

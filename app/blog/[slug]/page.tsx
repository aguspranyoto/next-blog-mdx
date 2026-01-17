export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post } = await import(`@/content/${slug}.mdx`)
 
  return <Post />
}
 
export function generateStaticParams() {
  return [{ slug: 'crafting-beautiful-articles-with-mdx-in-next-js' }, { slug: 'mastering-mdx' }]
}
 
export const dynamicParams = false
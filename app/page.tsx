import Image from "next/image";
import Link from "next/link";

// shadcn UI imports (user will ensure these exist)
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const latestPosts = await getAllPosts();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 font-sans">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-4xl px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/next.svg" alt="logo" width={36} height={24} className="dark:invert" />
            <div>
              <h1 className="text-lg font-semibold">Agusp Blog</h1>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Notes on web, design, and MDX</p>
            </div>
          </Link>
          <nav className="flex items-center gap-3">
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <section className="grid gap-8 md:grid-cols-3 md:items-center md:gap-6">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold leading-tight">Welcome — thoughts and tutorials</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-xl">
              I write about building web interfaces, authoring content with MDX, and practical
              frontend patterns. Browse the latest posts or search for topics.
            </p>

            <div className="mt-6 flex w-full gap-3">
              <Input placeholder="Search posts..." aria-label="Search posts" />
              <Button>Search</Button>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="rounded-lg bg-white/60 dark:bg-white/5 p-4">
              <h3 className="text-sm font-semibold">About me</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Senior frontend engineer sharing experiments and notes.</p>
              <div className="mt-3 flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/avatar-1.png" alt="Agus" />
                  <AvatarFallback>AG</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">Agus</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Frontend • Writer</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold">Latest posts</h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {latestPosts.map((post) => (
              <Card key={post.slug} className="gap-2">
                <CardHeader>
                  <CardTitle className="leading-6 min-h-12">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{post.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={typeof post.author === 'object' ? post.author.avatar ?? '/avatar-1.png' : '/avatar-1.png'} alt={typeof post.author === 'object' ? post.author.name : String(post.author)} />
                        <AvatarFallback>{(typeof post.author === 'object' ? post.author.name : String(post.author)).slice(0,2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <div className="font-medium">{typeof post.author === 'object' ? post.author.name : String(post.author)}</div>
                        <div className="text-xs text-zinc-600 dark:text-zinc-400">{post.date}</div>
                      </div>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-foreground">
                      Read
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

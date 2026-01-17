import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllPosts } from "@/lib/posts";
import Posts from "@/components/posts";

export default async function Home() {
  const posts = await getAllPosts();

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
              frontend patterns. Browse the posts for topics.
            </p>

            <Posts posts={posts} />
          </div>

          <div className="hidden md:block self-start">
            <div className="rounded-lg bg-white/60 dark:bg-white/5 p-4">
              <h3 className="text-sm font-semibold">About me</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Senior frontend engineer sharing experiments and notes. Please visit my LinkedIn profile <Link href="https://www.linkedin.com/in/aguspranyoto" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">here</Link>.</p>
              <div className="mt-3 flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/avatar-1.png" alt="Agus Pranyoto" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">Agus Pranyoto</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Frontend Developer</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

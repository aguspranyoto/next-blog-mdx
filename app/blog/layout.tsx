import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">
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

      <div className="mx-auto max-w-4xl px-6 py-12">
        <main className={styles.article}>{children}</main>
      </div>
    </div>
  );
}

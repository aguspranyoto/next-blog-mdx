"use client";
import React, { useState, useMemo, useEffect } from "react";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

type Props = { posts: PostMeta[] };

export default function Posts({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PostMeta[]>(posts);

  useEffect(() => {
    setResults(posts);
  }, [posts]);

  const doSearch = (q: string) => {
    const ql = q.trim().toLowerCase();
    if (!ql) {
      setResults(posts);
      return;
    }
    setResults(
      posts.filter((p) =>
        (
          (p.title ?? "") +
          " " +
          (p.description ?? "") +
          " " +
          (typeof p.author === "object" ? p.author.name : String(p.author ?? ""))
        )
          .toLowerCase()
          .includes(ql)
      )
    );
  };

  const debounced = useMemo(() => debounce(doSearch, 300), [posts]);

  useEffect(() => {
    return () => debounced.cancel();
  }, [debounced]);

  return (
    <>
      <div className="mt-6 flex w-full gap-3">
        <Input
          placeholder="Search posts..."
          aria-label="Search posts"
          value={query}
          onChange={(e) => {
            const v = (e.target as HTMLInputElement).value;
            setQuery(v);
            debounced(v);
          }}
        />
        <Button
          onClick={() => {
            debounced.cancel();
            doSearch(query);
          }}
        >
          Search
        </Button>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {results.map((post) => (
          <Card key={post.slug} className="gap-2 justify-between">
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
                    <AvatarImage
                      src={typeof post.author === "object" ? post.author.avatar ?? "/avatar-1.png" : "/avatar-1.png"}
                      alt={typeof post.author === "object" ? post.author.name : String(post.author)}
                    />
                    <AvatarFallback>
                      {(typeof post.author === "object" ? post.author.name : String(post.author)).slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <div className="font-medium">{typeof post.author === "object" ? post.author.name : String(post.author)}</div>
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
    </>
  );
}
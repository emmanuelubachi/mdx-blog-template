'use client';

import { MDXRemote } from 'next-mdx-remote';
import { PostHeader } from '@/components/blog/post-header';
import { components } from '@/lib/mdx-components';

interface BlogPostContentProps {
  post: any; // TODO: Add proper type
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="container py-12 max-w-3xl mx-auto">
      <PostHeader
        title={post.title}
        date={post.date}
        readingTime={post.readingTime.minutes}
      />
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote {...post.content} components={components} />
      </div>
    </article>
  );
}

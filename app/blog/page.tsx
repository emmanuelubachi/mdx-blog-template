import { getAllPosts } from '@/lib/mdx';
import { PostCard } from '@/components/blog/post-card';

export default async function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </div>
  );
}

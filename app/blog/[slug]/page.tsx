import { getPostById } from "@/lib/mdx";
import { generateBlogStaticParams } from "@/lib/blog";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/blog/post-content";

export async function generateStaticParams() {
  return generateBlogStaticParams();
}

type Params = Promise<{ slug: string }>;

export default async function BlogPost({ params }: { params: Params }) {
  const { slug } = await params;
  try {
    const post = await getPostById(slug);
    return <BlogPostContent post={post} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

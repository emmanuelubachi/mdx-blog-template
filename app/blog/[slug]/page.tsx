import { getPostById } from '@/lib/mdx'
import { generateBlogStaticParams } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { BlogPostContent } from '@/components/blog/post-content'

export async function generateStaticParams() {
  return generateBlogStaticParams()
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostById(params.slug)
    return <BlogPostContent post={post} />
  } catch (error) {
    notFound()
  }
}
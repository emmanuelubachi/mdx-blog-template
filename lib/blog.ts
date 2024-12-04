import { getAllPosts } from './mdx'

export async function generateBlogStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export type Post = {
  id: string
  title: string
  date: string
  excerpt: string
  content: string
  readingTime: {
    minutes: number
    text: string
  }
}
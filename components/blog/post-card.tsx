"use client"

import Link from 'next/link'
import { formatDistance } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Post } from '@/lib/blog'
import { motion } from 'framer-motion'

interface PostCardProps {
  post: Post
  index: number
}

export function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.id}`}>
        <Card className="h-full hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <time dateTime={post.date}>
                {formatDistance(new Date(post.date), new Date(), { addSuffix: true })}
              </time>
              <span className="mx-2">·</span>
              <span>{Math.ceil(post.readingTime.minutes)} min read</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{post.excerpt}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
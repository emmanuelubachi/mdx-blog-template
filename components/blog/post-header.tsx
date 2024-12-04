interface PostHeaderProps {
  title: string
  date: string
  readingTime: number
}

export function PostHeader({ title, date, readingTime }: PostHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="mb-2 text-4xl font-bold">{title}</h1>
      <div className="flex items-center text-sm text-muted-foreground">
        <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
        <span className="mx-2">·</span>
        <span>{Math.ceil(readingTime)} min read</span>
      </div>
    </div>
  )
}
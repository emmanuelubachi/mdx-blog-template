import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
// import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // return {
      //   id,
      //   readingTime: readingTime(content),
      //   ...data,
      // }
      // Ensure required fields are included
      return {
        id,
        title: data.title || "Untitled", // Provide fallback values if necessary
        date: data.date || "Unknown date",
        excerpt: data.excerpt || "No excerpt available.",
        content, // Include content if required
        readingTime: readingTime(content),
      };
    });

  // console.log(allPostsData); // Debugging
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostById(id: string) {
  try {
    const fullPath = path.join(postsDirectory, `${id}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const mdxSource = await serialize(content, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          // [rehypePrettyCode, { theme: "github-dark" }],
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    });

    return {
      id,
      content: mdxSource,
      readingTime: readingTime(content),
      ...data,
    };
  } catch (error) {
    console.error("Error processing MDX:", error);
    throw error;
  }
}

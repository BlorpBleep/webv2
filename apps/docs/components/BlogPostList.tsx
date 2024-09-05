"use client";

import BlogPostCard from "@/components/BlogPostCard";

type BlogPost = {
  title: string;
  url: string;
  date: string;
  description: string;
  image?: string;
  author?: { avatar?: string };
};

export const BlogPostList = ({ posts }: { posts: BlogPost[] }) => {
  return (
    <div className="mt-10 grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {posts.map((post, idx) => (
        <BlogPostCard key={idx} {...post} />
      ))}
    </div>
  );
};

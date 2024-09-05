"use client";

import { useEffect, useState } from "react";
import xml2js from "xml2js";
import { BlogPostList } from "@/components/BlogPostList"; // Use your existing BlogPostList component

type SubstackPost = {
  title: string;
  link: string;
  date: string;
  description: string;
  image?: string; // Optional image field for posts with images
};

type BlogPost = {
  title: string;
  url: string; // Adjusted to fit the BlogPostCard format
  date: string;
  description: string;
  image?: string; // Optional image field
};

export default function Blog() {
  const [substackPosts, setSubstackPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchSubstackPosts = async () => {
      try {
        const response = await fetch("/api/fetchSubstack"); // Your API route
        const rssText = await response.text();
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(rssText);

        // Log the full result to inspect the date format and data structure
        console.log("Substack Data:", result);

        // Parse the items and map them into the BlogPost format
        const parsedPosts = result.rss.channel[0].item.map((item) => {
          const contentEncoded = item["content:encoded"]?.[0] || "";
          const description = contentEncoded
            ? contentEncoded.slice(0, 150) // Truncate content to create a snippet
            : item.description?.[0]?.slice(0, 150) || ""; // Fallback to description if available

          return {
            title: item.title[0],
            url: item.link[0],
            date: item.pubDate[0], // Date from the Substack feed
            description: description + "...", // Truncate or format the description/snippet
            image: item.enclosure?.[0]?.$.url || "", // Fetch the image if available
          };
        });

        setSubstackPosts(parsedPosts);
      } catch (error) {
        console.error("Error fetching Substack posts:", error);
      }
    };

    fetchSubstackPosts();
  }, []);

  return (
    <div className="w-full lg:px-16 mt-12">
      <div className="text-center">
        <h1 className="mb-2 font-bold text-4xl">CicadaVPN Substack Updates</h1>
        <h5 className="text-default-500 text-lg">
          All the latest news about CicadaVPN via our Substack posts.
        </h5>
      </div>

      <div className="mt-8">
        <BlogPostList posts={substackPosts} />
      </div>
    </div>
  );
}

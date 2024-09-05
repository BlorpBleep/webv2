"use client";

import { Card, CardFooter, CardBody, CardHeader, Avatar, Image } from "@nextui-org/react";
import { format } from "date-fns";
import NextLink from "next/link";
import { motion } from "framer-motion";

// Define the prop types
interface BlogPostCardProps {
  title: string;
  url?: string; // Make url optional to handle cases when it's undefined
  date: string;
  description: string; // This will now contain raw HTML content
  image?: string;
  author?: {
    avatar?: string;
  };
}

const BlogPostCard = ({ title, url, date, description, author, image }: BlogPostCardProps) => {
  let formattedDate = "Unknown date";

  try {
    const parsedDate = new Date(date); // Use new Date() to handle Substack date format
    formattedDate = format(parsedDate, "LLLL d, yyyy"); // Format the date correctly
  } catch (error) {
    console.error("Error parsing or formatting date:", error);
  }

  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      initial={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.3 }}
    >
      {url ? (
        <NextLink href={url} passHref>
          <Card
            as="a"
            className="p-2 h-full border-transparent text-start relative"
            isPressable
          >
            {/* Background image with blur */}
            {image && (
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(8px)", // Apply blur to the background image only
                }}
              />
            )}

            {/* Overlay to darken the background and improve text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-5 z-0" />

            {/* Text content (not blurred) */}
            <div className="relative z-10 p-6">
              <CardHeader>
                <h2 className="font-semibold text-white">{title}</h2>
              </CardHeader>

              <CardBody className="pt-0 px-2 pb-1">
                {/* Render the HTML content using dangerouslySetInnerHTML */}
                <div
                  className="font-normal w-full text-white"
                  dangerouslySetInnerHTML={{ __html: description }} // Render raw HTML snippet
                />
              </CardBody>

              <CardFooter className="flex justify-between items-end">
                {/* Display the formatted date in the bottom left corner */}
                <time className="block text-small text-white absolute bottom-2 left-2" dateTime={date}>
                  {formattedDate}
                </time>
                {/* Display the avatar in the bottom right corner */}
                {author?.avatar && (
                  <Avatar
                    size="sm"
                    src={author.avatar}
                    className="absolute bottom-2 right-2"
                  />
                )}
              </CardFooter>
            </div>
          </Card>
        </NextLink>
      ) : (
        <Card className="p-2 h-full border-transparent text-start relative">
          {/* Background image with blur */}
          {image && (
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(8px)", // Apply blur to the background image only
              }}
            />
          )}

          {/* Overlay to darken the background and improve text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-5 z-0" />

          {/* Text content (not blurred) */}
          <div className="relative z-10 p-6">
            <CardHeader>
              <h2 className="font-semibold text-white">{title}</h2>
            </CardHeader>

            <CardBody className="pt-0 px-2 pb-1">
              {/* Render the HTML content using dangerouslySetInnerHTML */}
              <div
                className="font-normal w-full text-white"
                dangerouslySetInnerHTML={{ __html: description }} // Render raw HTML snippet
              />
            </CardBody>

            <CardFooter className="flex justify-between items-end">
              {/* Display the formatted date in the bottom left corner */}
              <time className="block text-small text-white absolute bottom-2 left-2" dateTime={date}>
                {formattedDate}
              </time>
              {/* Display the avatar in the bottom right corner */}
              {author?.avatar && (
                <Avatar
                  size="sm"
                  src={author.avatar}
                  className="absolute bottom-2 right-2"
                />
              )}
            </CardFooter>
          </div>
        </Card>
      )}
    </motion.article>
  );
};

export default BlogPostCard;

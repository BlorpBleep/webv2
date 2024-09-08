import xml2js from "xml2js";
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react"; // Import NextUI components
import Link from "next/link"; // For linking to the Substack post

type BlogPost = {
  title: string;
  url: string;
  date: string;
  description: string;
  image?: string;
};

// Utility function to strip HTML tags from a string
const stripHtmlTags = (html: string) => {
  return html.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags with regex
};

// Utility function to decode common HTML entities (including apostrophes)
const decodeHtmlEntities = (text: string) => {
  const entities = {
    '&#8217;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8230;': '...',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
  };

  return text.replace(/&#?\w+;/g, (match) => entities[match] || match);
};

// Utility function to format date without time
const formatDateWithoutTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Server-side fetching directly in the component (Server Component)
export default async function Blog() {
  // Fetch and parse RSS feed
  const response = await fetch('https://cicadavpn.substack.com/feed', { cache: 'no-store' });
  const rssText = await response.text();

  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(rssText);

  // Map the RSS feed items into the BlogPost format
  const parsedPosts: BlogPost[] = result.rss.channel[0].item.map((item: any) => {
    const contentEncoded = item["content:encoded"]?.[0] || "";
    const description = contentEncoded
      ? decodeHtmlEntities(stripHtmlTags(contentEncoded.slice(0, 150))) // Strip HTML tags and decode entities
      : decodeHtmlEntities(stripHtmlTags(item.description?.[0]?.slice(0, 150) || "")); // Fallback to description if available

    return {
      title: item.title[0],
      url: item.link[0],
      date: formatDateWithoutTime(item.pubDate[0]), // Format the date without time
      description: description + "...", // Truncate or format the description/snippet
      image: item.enclosure?.[0]?.$.url || "", // Fetch the image if available
    };
  });

  return (
    <div className="w-full lg:px-16 mt-12 ">
      <div className="text-center mb-12">
        <h1 className="mb-2 font-bold text-4xl">CicadaVPN Substack Updates</h1>
        <h5 className="text-default-500 text-lg">
          All the latest news about CicadaVPN via our Substack posts.
        </h5>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {parsedPosts.map((post) => (
          <Link href={post.url} key={post.url} passHref>
            <Card
              isPressable
              isHoverable
              className="border-none max-w-[400px] bg-accents0 h-[450px]" // Set height for uniformity
            >
              {post.image && (
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt={post.title}
                    className="object-cover rounded-xl"
                    src={post.image}
                    width="100%"
                    height={140}
                  />
                </CardBody>
              )}

              <CardHeader className="pb-0 px-4 flex-col items-start">
                <h4 className="font-bold text-left text-large">{post.title}</h4>
              </CardHeader>

              <CardBody className="px-4 text-left">
                <p className="text-default-500">{post.description}</p>
              </CardBody>

              <CardFooter className="px-4 justify-start">
                <p className="text-tiny text-default-400">{post.date}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
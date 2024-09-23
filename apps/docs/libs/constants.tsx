import {DiscordIcon, GithubIcon, SubstackIcon, TwitterIcon, YouTubeIcon, InstagramIcon} from "@/components/icons";

export const TWITTER_USER_NAME = "getnextui";
export const SITE_URL = "https://nextui.org";

export const communityAccounts = [
  {
    title: "Twitter",
    description: "For announcements, tips and general information.",
    icon: <TwitterIcon className="text-[#00ACEE]" size={32} />,
    href: "https://x.com/cicadavpn",
    isExternal: true,
  },
  {
    title: "Discord",
    description: "To get involved in the community, ask questions and share tips.",
    icon: <DiscordIcon className="text-[#7289DA]" size={32} />,
    href: "https://discord.com/channels/1287725294228344904/1287725294894972971",
    isExternal: true,
  },
  {
    title: "Github",
    description: "To report bugs, request features and contribute to the project.",
    icon: <GithubIcon className="text-[#333] dark:text-[#E7E7E7]" size={32} />,
    href: "https://github.com/muchchirp",
    isExternal: true,
  },
  {
    title: "Substack",
    description: "To check out news and articles from the industry and the project.",
    icon: <SubstackIcon className="text-[#FF6719]" size={32} />,
    href: "https://cicadavpn.substack.com/",
    isExternal: true,
  },
  {
    title: "YouTube",
    description: "For video updates, tutorials, and behind-the-scenes content.",
    icon: <YouTubeIcon className="text-[#FF0000]" size={32} />,
    href: "https://www.youtube.com/@CicadaVPN",
    isExternal: true,
  },
  {
    title: "Instagram",
    description: "Follow us for photos, stories, and more visual updates.",
    icon: <InstagramIcon className="text-[#E4405F]" size={32} />,
    href: "https://www.instagram.com/youraccount",
    isExternal: true,
  },
];

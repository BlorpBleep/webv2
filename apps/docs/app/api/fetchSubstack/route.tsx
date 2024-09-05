import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://cicadavpn.substack.com/feed');
    const rssText = await response.text();
    return new NextResponse(rssText, { status: 200 });
  } catch (error) {
    console.error("Error fetching Substack posts:", error);
    return new NextResponse(JSON.stringify({ error: "Error fetching Substack posts" }), { status: 500 });
  }
}

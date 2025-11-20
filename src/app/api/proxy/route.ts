import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // Validate URL
    const targetUrl = new URL(url);
    
    // Fetch the target website
    const response = await fetch(targetUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    // Get the HTML content
    let html = await response.text();

    // Inject base tag to fix relative URLs
    const baseTag = `<base href="${targetUrl.origin}">`;
    html = html.replace('<head>', `<head>${baseTag}`);

    // Create response with modified headers
    const proxyResponse = new NextResponse(html, {
      status: response.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        // Remove security headers that block iframes
        'Access-Control-Allow-Origin': '*',
      },
    });

    // Remove CSP and X-Frame-Options headers
    proxyResponse.headers.delete('X-Frame-Options');
    proxyResponse.headers.delete('Content-Security-Policy');
    proxyResponse.headers.delete('X-Content-Type-Options');

    return proxyResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch URL', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

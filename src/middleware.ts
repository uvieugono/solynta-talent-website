import { NextRequest, NextResponse } from "next/server";

const GEO_COOKIE = "st-market";

export function middleware(req: NextRequest) {
  // Only redirect on the root path
  if (req.nextUrl.pathname !== "/") return NextResponse.next();

  // If user has explicitly chosen a market, respect it
  if (req.cookies.get(GEO_COOKIE)) return NextResponse.next();

  // Allow override via query param: /?market=us | /?market=uk | /?market=ng
  const marketParam = req.nextUrl.searchParams.get("market");
  if (marketParam) {
    const res = NextResponse.next();
    res.cookies.set(GEO_COOKIE, marketParam, { maxAge: 60 * 60 * 24 * 90 }); // 90 days
    return res;
  }

  // Geo-detection via Vercel header (works on Vercel Edge)
  const country = req.headers.get("x-vercel-ip-country") || "";

  if (country === "GB") {
    const url = req.nextUrl.clone();
    url.pathname = "/uk";
    const res = NextResponse.redirect(url);
    res.cookies.set(GEO_COOKIE, "uk", { maxAge: 60 * 60 * 24 * 90 });
    return res;
  }

  if (country === "NG") {
    const url = req.nextUrl.clone();
    url.pathname = "/ng";
    const res = NextResponse.redirect(url);
    res.cookies.set(GEO_COOKIE, "ng", { maxAge: 60 * 60 * 24 * 90 });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};

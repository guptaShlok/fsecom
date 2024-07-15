import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
// import
export async function middleware(request: NextRequest) {}
export const config = {
  matcher: ["/sign-in", "/sign-up", "/dashboard/:path*", "/verify/:path*"],
};

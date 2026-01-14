import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request) {
  const token = await getToken({
    req: request,
    secret: process.env.SECRET,
  });
  const { pathname } = request.nextUrl;

  // ১. ইউজার লগইন না থাকলে লগইন বা রেজিস্টার পেজ ছাড়া অন্য সব রাউট থেকে রিডাইরেক্ট করা
  if (!token) {
    if (pathname !== "/login" && pathname !== "/register") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // ২. ইউজার লগইন থাকা অবস্থায় লগইন বা রেজিস্টার পেজে ঢুকতে চাইলে হোম/ড্যাশবোর্ডে পাঠানো
  // এখানে রোল চেক বাদ দিয়ে সরাসরি একটি কমন পেজে রিডাইরেক্ট করা হচ্ছে
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ৩. ইউজার লগইন থাকলে পরবর্তী ধাপে যাওয়ার অনুমতি দেওয়া
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/admin/:path*",
    "/user/:path*",
    "/books/:path*",
    "/tutorials/:path*",
    "/login",
    "/register",
  ],
};

import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

const pathUnAuth = ["/login", "/signup"]

export async function proxy(request: NextRequest) {
  const urlreq = request.url
  const reqURL = new URL(urlreq)
  const pathname = reqURL.pathname

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const isUnAuthRoute = pathUnAuth.includes(pathname)
  if (isUnAuthRoute) {
    if (session) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  } else {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
}

import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Ratelimit } from "@upstash/ratelimit"

import Redis from "@/lib/redis"
import { translateText } from "@/lib/translator"

// Create a new ratelimiter, that allows 25 requests per 24 hours
const MAX_REQUESTS = 25

const ratelimit = Redis
  ? new Ratelimit({
      redis: Redis,
      limiter: Ratelimit.fixedWindow(MAX_REQUESTS, "1440 m"),
      analytics: true,
    })
  : undefined

export async function POST(req: Request) {
  const { prompt, from, to} = (await req.json()) as {
    prompt?: string
    from: string
    to: string
  }

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 })
  }

  const isDev = process.env.NODE_ENV === "development"
  if (!isDev && ratelimit) {
    const headersList = headers()

    const ipIdentifier = headersList.get("x-real-ip")

    const result = await ratelimit.limit(ipIdentifier ?? "")

    if (!result.success) {
      return new Response(
        "Too many uploads in 1 day. Please try again in a 24 hours.",
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": result.limit,
            "X-RateLimit-Remaining": result.remaining,
          } as any,
        }
      )
    }
  }

  const result = await translateText(prompt, from, to)

  return NextResponse.json(result)
}
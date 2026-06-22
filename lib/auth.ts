import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/db/db"
import { nextCookies } from "better-auth/next-js"
import * as schema from "@/db/schema"
import { sendEmail } from "@/lib/email"
import { headers } from "next/headers"
import VerifyEmailTemplate from "@/components/emails/template-verify-email"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async beforeEmailVerification(user, request) {
      // Run pre-verification logic
      console.log(`About to verify ${user.email}`)
    },
    async afterEmailVerification(user, request) {
      // Your custom logic here, e.g., grant access to premium features
      console.log(`${user.email} has been successfully verified!`)
    },
    sendVerificationEmail: async ({ user, url }) => {
      console.log("================================")
      console.log("SEND VERIFICATION EMAIL CALLED")
      console.log("EMAIL:", user.email)

      try {
        const result = await sendEmail({
          to: [user.email],
          subject: "Verify your email",
          react: VerifyEmailTemplate({
            username: user.name,
            verifyUrl: url,
          }),
        })

        console.log("RESEND RESULT")
        console.log(result)
        console.log("================================")
      } catch (error) {
        console.error("RESEND ERROR")
        console.error(error)
      }
    },
  },
  plugins: [nextCookies()],
})

export const getServerSession = async () => {
  return await auth.api.getSession({ headers: await headers() })
}

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user

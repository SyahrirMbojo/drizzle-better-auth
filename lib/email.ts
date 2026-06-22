import { JSX } from "react/jsx-runtime"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailValues {
  to: string | string[]
  subject: string
  react: JSX.Element
}

export async function sendEmail({ to, subject, react }: SendEmailValues) {
  return await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to,
    subject,
    react,
  })
}

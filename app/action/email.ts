import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (token: string, email: string) => {
  const confirmationLink =
    process.env.WEBSITE_URL + `/auth/new-verification?token=${token}`;

  try {
    const res = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "verification email auth js",
      html: `<p>your token is <a href=${confirmationLink}>click here</a></p>`,
    });
  } catch (error) {
    return null;
  }
};

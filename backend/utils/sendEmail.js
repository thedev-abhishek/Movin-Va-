import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (name, email, message) => {
  try {
    const response = await resend.emails.send({
      from: "Movin Va <onboarding@resend.dev>",
      to: "hello@movinva.com",
      subject: "New Contact Form Message",
      html: `
        <h2>New Contact Inquiry</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    return response;
  } catch (error) {
    console.log("Email Error:", error);
    throw error;
  }
};
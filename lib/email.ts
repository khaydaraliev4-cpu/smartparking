import nodemailer from "nodemailer";

export async function sendVerificationCode(email: string, code: string) {
  if (!process.env.SMTP_HOST) {
    console.info(`Verification code for ${email}: ${code}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM || "noreply@smartparking.app",
    to: email,
    subject: "SmartParking verification code",
    text: `Your SmartParking verification code is ${code}. It expires in 10 minutes.`
  });
}

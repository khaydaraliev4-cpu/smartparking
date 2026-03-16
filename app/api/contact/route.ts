import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { message } = await request.json();
  if (!message || message.length < 3) return Response.json({ error: "Too short" }, { status: 400 });

  await prisma.contactMessage.create({ data: { message } });

  if (process.env.SMTP_HOST) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM || "noreply@smartparking.app",
      to: "khaydaraliev4@gmail.com",
      subject: "SmartParking contact message",
      text: message
    });
  }

  return Response.json({ ok: true });
}

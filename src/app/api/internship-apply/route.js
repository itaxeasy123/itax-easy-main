import nodemailer from "nodemailer";

export const runtime = "nodejs"; // ⬅️ VERY IMPORTANT

export async function POST(req) {
  try {
    const body = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.verify(); // ⬅️ SMTP check

    await transporter.sendMail({
      from: `"Internship Application" <${process.env.MAIL_USER}>`,
      to: "itaxeasy19@gmail.com",
      subject: "New Internship Application",
      html: `
        <h3>New Internship Application</h3>
        <p><b>Name:</b> ${body.name}</p>
        <p><b>Email:</b> ${body.email}</p>
        <p><b>Phone:</b> ${body.phone}</p>
        <p><b>Course:</b> ${body.course}</p>
        <p><b>Message:</b> ${body.message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("MAIL ERROR:", error); // ⬅️ IMPORTANT
    return new Response("Mail failed", { status: 500 });
  }
}

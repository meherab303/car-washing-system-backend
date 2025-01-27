import nodemailer from "nodemailer";
import config from "../../app/config";
export const sendEmail = async (receivers: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.Node_ENV === "production", // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.node_mailer_email,
      pass: config.node_mailer_pass,
    },
  });
  await transporter.sendMail({
    from: config.node_mailer_email,
    to: receivers,
    subject: "Reset Your Password within Ten minutes",
    text: "",
    html: `${resetLink}`,
  });
};

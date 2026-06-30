import EmailService from "../../services/email.service.js";

export default async function sendResetPasswordJob(job) {
  const {
    email,
    name,
    resetUrl,
  } = job.data;

  return EmailService.sendResetPasswordEmail({
    email,
    name,
    resetUrl,
  });
}
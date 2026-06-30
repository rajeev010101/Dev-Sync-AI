import EmailService from "../../services/email.service.js";

export default async function sendVerificationJob(job) {
  const {
    email,
    name,
    verificationUrl,
  } = job.data;

  return EmailService.sendVerificationEmail({
    email,
    name,
    verificationUrl,
  });
}
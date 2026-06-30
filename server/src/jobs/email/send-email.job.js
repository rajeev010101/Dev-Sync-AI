import EmailService from "../../services/email.service.js";

export default async function sendEmailJob(job) {
  const {
    to,
    subject,
    html,
    text,
    attachments = [],
  } = job.data;

  return EmailService.send({
    to,
    subject,
    html,
    text,
    attachments,
  });
}
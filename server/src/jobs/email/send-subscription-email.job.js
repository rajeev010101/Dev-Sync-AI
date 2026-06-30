import EmailService from "../../services/email.service.js";

export default async function sendSubscriptionEmailJob(job) {
  const {
    email,
    name,
    plan,
    amount,
    renewalDate,
  } = job.data;

  return EmailService.sendSubscriptionEmail({
    email,
    name,
    plan,
    amount,
    renewalDate,
  });
}
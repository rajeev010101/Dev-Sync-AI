import sendEmailJob from "./send-email.job.js";
import sendResetPasswordJob from "./send-reset-password.job.js";
import sendVerificationJob from "./send-verification.job.js";
import sendSubscriptionEmailJob from "./send-subscription-email.job.js";

const EmailJobs = {
  "email.send": sendEmailJob,
  "email.reset-password": sendResetPasswordJob,
  "email.verify": sendVerificationJob,
  "email.subscription": sendSubscriptionEmailJob,
};

export default EmailJobs;
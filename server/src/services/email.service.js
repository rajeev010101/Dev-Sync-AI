import transporter from "../config/mail.js";

import welcomeTemplate from "../templates/emails/welcome.template.js";
import verificationTemplate from "../templates/emails/verification.template.js";
import resetPasswordTemplate from "../templates/emails/reset-password.template.js";
import subscriptionTemplate from "../templates/emails/subscription.template.js";

class EmailService {
  async send({
    to,
    subject,
    html,
    text,
    attachments = [],
  }) {
    return transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
      text,
      attachments,
    });
  }

  async sendWelcomeEmail({
    email,
    name,
  }) {
    return this.send({
      to: email,
      subject: "Welcome to DevSync AI",
      html: welcomeTemplate(name),
    });
  }

  async sendVerificationEmail({
    email,
    name,
    verificationUrl,
  }) {
    return this.send({
      to: email,
      subject: "Verify your email",
      html: verificationTemplate(
        name,
        verificationUrl
      ),
    });
  }

  async sendResetPasswordEmail({
    email,
    name,
    resetUrl,
  }) {
    return this.send({
      to: email,
      subject: "Reset your password",
      html: resetPasswordTemplate(
        name,
        resetUrl
      ),
    });
  }

  async sendSubscriptionEmail({
    email,
    name,
    plan,
    amount,
    renewalDate,
  }) {
    return this.send({
      to: email,
      subject: "Subscription Activated",
      html: subscriptionTemplate(
        name,
        plan,
        amount,
        renewalDate
      ),
    });
  }
}

export default new EmailService();
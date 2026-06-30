export default function verificationTemplate(
  name,
  verificationUrl
) {
  return `
    <h2>Email Verification</h2>

    <p>Hello ${name},</p>

    <p>Please verify your account.</p>

    <a href="${verificationUrl}">
      Verify Email
    </a>
  `;
}
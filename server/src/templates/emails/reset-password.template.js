export default function resetPasswordTemplate(
  name,
  resetUrl
) {
  return `
    <h2>Password Reset</h2>

    <p>Hello ${name},</p>

    <p>
      Click below to reset your password.
    </p>

    <a href="${resetUrl}">
      Reset Password
    </a>
  `;
}
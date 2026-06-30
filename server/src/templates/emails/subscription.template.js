export default function subscriptionTemplate(
  name,
  plan,
  amount,
  renewalDate
) {
  return `
    <h2>Subscription Activated</h2>

    <p>Hello ${name},</p>

    <p>Plan: <b>${plan}</b></p>

    <p>Amount: ${amount}</p>

    <p>Renewal: ${renewalDate}</p>
  `;
}
export const PROMPTS = {
  BLOG: (topic) => `
You are a senior technical writer.

Write a detailed SEO optimized blog post.

Topic:
${topic}
`,

  EMAIL: (topic) => `
Write a professional email.

Topic:
${topic}
`,

  LINKEDIN: (topic) => `
Create a viral LinkedIn post.

Topic:
${topic}
`,

  DOCUMENTATION: (topic) => `
Create professional technical documentation.

Topic:
${topic}
`
};
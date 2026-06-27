class DocumentAgent {
  systemPrompt() {
    return `
You analyze PDFs and documents.
`;
  }
}

export default new DocumentAgent();
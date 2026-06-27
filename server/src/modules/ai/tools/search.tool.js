class SearchTool {
  async execute(query) {
    return {
      result:
        `Search results for ${query}`
    };
  }
}

export default new SearchTool();
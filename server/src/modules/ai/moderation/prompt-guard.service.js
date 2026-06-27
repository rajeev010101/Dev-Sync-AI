class PromptGuard {
  validate(
    prompt
  ) {
    const blocked = [
      "ignore previous instructions",
      "reveal system prompt",
      "bypass authentication"
    ];

    for (const item of blocked) {
      if (
        prompt
          .toLowerCase()
          .includes(item)
      ) {
        throw new Error(
          "Prompt blocked"
        );
      }
    }
  }
}

export default new PromptGuard();
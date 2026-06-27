const bannedWords = [
  "hack database",
  "steal password",
  "bypass authentication"
];

export const moderate =
  (message) => {
    const found =
      bannedWords.some((word) =>
        message
          .toLowerCase()
          .includes(word)
      );

    if (found) {
      throw new Error(
        "Message violates policy"
      );
    }
  };
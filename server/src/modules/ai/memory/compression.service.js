class CompressionService {
  compress(
    messages
  ) {
    return messages.slice(
      -10
    );
  }
}

export default new CompressionService();
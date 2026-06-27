class SocketStreamService {
  emitChunk(
    io,
    chatId,
    chunk
  ) {
    io.to(chatId).emit(
      "ai:chunk",
      chunk
    );
  }

  emitDone(
    io,
    chatId
  ) {
    io.to(chatId).emit(
      "ai:done"
    );
  }
}

export default new SocketStreamService();
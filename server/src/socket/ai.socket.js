export const registerAISocket =
  (io) => {
    io.on(
      "connection",
      (socket) => {
        socket.on(
          "ai:join",
          (chatId) => {
            socket.join(chatId);
          }
        );
      }
    );
  };
export const registerNotificationSocket =
  (io) => {
    io.on(
      "connection",
      (socket) => {
        socket.on(
          "join-user",
          (
            userId
          ) => {
            socket.join(
              userId
            );
          }
        );
      }
    );
  };
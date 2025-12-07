export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join Room
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    // Receive & Broadcast Message
    socket.on("sendMessage", (data) => {
      console.log("Message received:", data);

      // 🔥 Add timestamp + forward clean data
      const messageData = {
        roomId: data.roomId,
        senderId: data.senderId,
        senderName: data.senderName,
        message: data.message,
        createdAt: Date.now(),   // 🔥 time added
      };

      // Broadcast to room
      io.in(data.roomId).emit("receiveMessage", messageData);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

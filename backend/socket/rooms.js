// backend/socket/rooms.js
export const handleRooms = (io, socket) => {
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });
};
